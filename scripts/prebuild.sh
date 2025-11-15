#!/bin/bash

set -e

# Include version info
source "$rootdir/scripts/versions.sh"

# Applies the overlay files in the given directory
# to the current directory
function apply_overlay() {
    source_dir="$1"
    find "$source_dir" -type f| while read -r src; do
        target="${src#"$source_dir"}"
        mkdir -vp "$(dirname "$target")"
        cp -vrf "$src" "$target"
    done
}

# shellcheck disable=SC2154
if [[ "$env_source" != "true" ]]; then
    echo "Use 'source scripts/env_local.sh' before calling prebuild or build"
    exit 1
fi

if [[ -z "$FIREFOX_VERSION" ]]; then
    echo "\$FIREFOX_VERSION is not set! Aborting..."
    exit 1
fi

if [[ -z "${SB_GAPI_KEY_FILE}" ]]; then
    echo "SB_GAPI_KEY_FILE environment variable has not been specified! Safe Browsing will not be supported in this build."
    read -p "Do you want to continue [y/N] " -n 1 -r
    echo ""
    if ! [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborting..."
        exit 1
    fi
fi

# Set platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM=darwin
else
    PLATFORM=linux
fi

# Set architecture
PLATFORM_ARCH=$(uname -m)
if [[ "$PLATFORM_ARCH" == "arm64" ]]; then
    PLATFORM_ARCHITECTURE=aarch64
else
    PLATFORM_ARCHITECTURE=x86-64
fi

# Create build directory
mkdir -vp "$rootdir/build"

# Check patch files
source "$rootdir/scripts/patches.sh"

pushd "$gecko"
if ! ironfox_gecko_check_patches; then
    echo "Patch validation failed. Please check the patch files and try again."
    exit 1
fi
if ! stremio_gecko_check_patches; then
    echo "Patch validation failed. Please check the patch files and try again."
    exit 1
fi
popd

if [[ -n ${FDROID_BUILD+x} ]]; then
    # Set up Rust
    # shellcheck disable=SC2154
    "$rustup"/rustup-init.sh -y --no-update-default-toolchain
else
    curl --doh-cert-status --no-insecure --no-proxy-insecure --no-sessionid --no-ssl --no-ssl-allow-beast --no-ssl-auto-client-cert --no-ssl-no-revoke --no-ssl-revoke-best-effort --proto -all,https --proto-default https --proto-redir -all,https --show-error -sSf https://sh.rustup.rs | sh -s -- -y --no-update-default-toolchain
fi

source "$CARGO_HOME/env"
rustup default "$RUST_VERSION"
rustup target add aarch64-unknown-linux-gnu
rustup target add aarch64-apple-darwin
rustup target add x86_64-unknown-linux-gnu
rustup target add x86_64-apple-darwin
rustup target add x86_64-pc-windows-msvc
cargo install --vers "$CBINDGEN_VERSION" cbindgen

# Set up target parameters
case "$1" in
arm64-linux)
    phoenixplatform=linux
    target=aarch64-unknown-linux-gnu
    ;;
arm64-macos)
    phoenixplatform=macos
    target=aarch64-apple-darwin
    ;;
x86_64-linux)
    phoenixplatform=linux
    target=x86_64-unknown-linux-gnu
    ;;
x86_64-macos)
    phoenixplatform=macos
    target=x86_64-apple-darwin
    ;;
x86_64-windows)
    phoenixplatform=windows
    target=x86_64-pc-windows-msvc
    ;;
*)
    echo "Unknown build variant: '$1'" >&2
    exit 1
    ;;
esac

# Gecko
pushd "$gecko"

# Apply patches
ironfox_gecko_apply_patches
stremio_gecko_apply_patches

# Let it be stremio-gecko
mkdir -vp browser/branding/stremio-gecko/content
mkdir -vp browser/branding/stremio-gecko/locales/en-US
mkdir -vp browser/branding/stremio-gecko/msix/Assets
mkdir -vp browser/branding/stremio-gecko/pref
mkdir -vp browser/branding/stremio-gecko/stubinstaller
$SED -i -e 's|"MOZ_APP_VENDOR", ".*"|"MOZ_APP_VENDOR", "stremio-gecko Authors"|g' browser/moz.configure
echo '' >>browser/moz.configure
echo 'include("stremio-gecko.configure")' >>browser/moz.configure
$SED -i -e 's/Fennec/stremio-gecko/g; s/Firefox/stremio-gecko/g' build/moz.configure/init.configure
$SED -i -e 's/browser.ironfox./browser.stremio-gecko./g' services/settings/Utils.sys.mjs
$SED -i -e 's/browser.ironfox./browser.stremio-gecko./g' toolkit/components/extensions/parent/ext-storage.js

# Package policies
echo '' >>browser/installer/package-manifest.in
echo '@RESPATH@/distribution/policies.json' >>browser/installer/package-manifest.in
echo '' >>moz.build
echo 'DIRS += ["stremio-gecko"]' >>moz.build

# Fix packaging when legacy autoconfig functionality is disabled at build-time
$SED -i -e 's|@RESPATH@/defaults/autoconfig/prefcalls.js|; @RESPATH@/defaults/autoconfig/prefcalls.js|g' browser/installer/package-manifest.in

# Break the dependency on older Rust
$SED -i -e "s|rust-version = .*|rust-version = \""${RUST_VERSION}\""|g" Cargo.toml
$SED -i -e "s|rust-version = .*|rust-version = \""${RUST_MAJOR_VERSION}\""|g" intl/icu_capi/Cargo.toml
$SED -i -e "s|rust-version = .*|rust-version = \""${RUST_MAJOR_VERSION}\""|g" intl/icu_segmenter_data/Cargo.toml

# Disable debug
$SED -i -e 's|debug-assertions = .*|debug-assertions = false|g' Cargo.toml

# Disable Normandy (Experimentation)
$SED -i -e 's|"MOZ_NORMANDY", .*)|"MOZ_NORMANDY", False)|g' browser/moz.configure

# Disable SSLKEYLOGGING
## https://bugzilla.mozilla.org/show_bug.cgi?id=1183318
## https://bugzilla.mozilla.org/show_bug.cgi?id=1915224
$SED -i -e 's|NSS_ALLOW_SSLKEYLOGFILE ?= .*|NSS_ALLOW_SSLKEYLOGFILE ?= 0|g' security/nss/lib/ssl/Makefile
echo '' >>security/moz.build
echo 'gyp_vars["enable_sslkeylogfile"] = 0' >>security/moz.build

# Disable telemetry
$SED -i -e 's|"MOZ_SERVICES_HEALTHREPORT", .*)|"MOZ_SERVICES_HEALTHREPORT", False)|g' browser/moz.configure

# Remove unused about:telemetry assets
rm -vf toolkit/content/aboutTelemetry.css toolkit/content/aboutTelemetry.js toolkit/content/aboutTelemetry.xhtml

# No-op RemoteSettingsCrashPull
$SED -i 's|crash-reports-ondemand||g' toolkit/components/crashes/RemoteSettingsCrashPull.sys.mjs
$SED -i -e 's/REMOTE_SETTINGS_CRASH_COLLECTION = ".*"/REMOTE_SETTINGS_CRASH_COLLECTION = ""/' toolkit/components/crashes/RemoteSettingsCrashPull.sys.mjs

# No-op Normandy (Experimentation)
$SED -i -e 's/REMOTE_SETTINGS_COLLECTION = ".*"/REMOTE_SETTINGS_COLLECTION = ""/' toolkit/components/normandy/lib/RecipeRunner.sys.mjs
$SED -i 's|normandy-recipes-capabilities||g' toolkit/components/normandy/lib/RecipeRunner.sys.mjs

# No-op Nimbus (Experimentation)
$SED -i -e 's/COLLECTION_ID_FALLBACK = ".*"/COLLECTION_ID_FALLBACK = ""/' toolkit/components/nimbus/ExperimentAPI.sys.mjs
$SED -i -e 's/COLLECTION_ID_FALLBACK = ".*"/COLLECTION_ID_FALLBACK = ""/' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs
$SED -i -e 's/EXPERIMENTS_COLLECTION = ".*"/EXPERIMENTS_COLLECTION = ""/' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs
$SED -i -e 's/SECURE_EXPERIMENTS_COLLECTION = ".*"/SECURE_EXPERIMENTS_COLLECTION = ""/' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs
$SED -i -e 's/SECURE_EXPERIMENTS_COLLECTION_ID = ".*"/SECURE_EXPERIMENTS_COLLECTION_ID = ""/' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs
$SED -i 's|nimbus-desktop-experiments||g' toolkit/components/nimbus/ExperimentAPI.sys.mjs
$SED -i 's|nimbus-desktop-experiments||g' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs
$SED -i 's|nimbus-secure-experiments||g' toolkit/components/nimbus/lib/RemoteSettingsExperimentLoader.sys.mjs

# No-op telemetry
$SED -i -e '/enable_internal_pings:/s/true/false/' toolkit/components/glean/src/init/mod.rs
$SED -i -e '/upload_enabled =/s/true/false/' toolkit/components/glean/src/init/mod.rs
$SED -i -e '/use_core_mps:/s/true/false/' toolkit/components/glean/src/init/mod.rs
$SED -i 's|localhost||g' toolkit/components/telemetry/pings/BackgroundTask_pingsender.sys.mjs
$SED -i 's|localhost||g' toolkit/components/telemetry/pingsender/pingsender.cpp
$SED -i -e 's/usageDeletionRequest.setEnabled(.*)/usageDeletionRequest.setEnabled(false)/' toolkit/components/telemetry/app/UsageReporting.sys.mjs
$SED -i -e 's|useTelemetry = .*|useTelemetry = false;|g' toolkit/components/telemetry/core/Telemetry.cpp
$SED -i '/# This must remain last./i gkrust_features += ["glean_disable_upload"]\n' toolkit/library/rust/gkrust-features.mozbuild

$SED -i -e 's|include_client_id: .*|include_client_id: false|g' toolkit/components/glean/pings.yaml
$SED -i -e 's|send_if_empty: .*|send_if_empty: false|g' toolkit/components/glean/pings.yaml
$SED -i -e 's|include_client_id: .*|include_client_id: false|g' toolkit/components/nimbus/pings.yaml
$SED -i -e 's|send_if_empty: .*|send_if_empty: false|g' toolkit/components/nimbus/pings.yaml

# Prevent DoH canary requests
$SED -i -e 's/GLOBAL_CANARY = ".*"/GLOBAL_CANARY = ""/' toolkit/components/doh/DoHHeuristics.sys.mjs
$SED -i -e 's/ZSCALER_CANARY = ".*"/ZSCALER_CANARY = ""/' toolkit/components/doh/DoHHeuristics.sys.mjs

# Prevent DoH remote config/rollout
$SED -i -e 's/RemoteSettings(".*"/RemoteSettings(""/' toolkit/components/doh/DoHConfig.sys.mjs
$SED -i -e 's/kConfigCollectionKey = ".*"/kConfigCollectionKey = ""/' toolkit/components/doh/DoHTestUtils.sys.mjs
$SED -i -e 's/kProviderCollectionKey = ".*"/kProviderCollectionKey = ""/' toolkit/components/doh/DoHTestUtils.sys.mjs
$SED -i 's|"doh-config"||g' toolkit/components/doh/DoHConfig.sys.mjs
$SED -i 's|"doh-providers"||g' toolkit/components/doh/DoHConfig.sys.mjs
$SED -i 's|"doh-config"||g' toolkit/components/doh/DoHTestUtils.sys.mjs
$SED -i 's|"doh-providers"||g' toolkit/components/doh/DoHTestUtils.sys.mjs

# Remove built-in search engines
$SED -i -e 's|% resource search-extensions|# % resource search-extensions|g' browser/components/search/jar.mn
$SED -i -e 's|search-extensions/|# search-extensions/|g' browser/components/search/jar.mn
rm -vrf browser/components/search/extensions

# Remove the Clear Key CDM
$SED -i -e 's|@RESPATH@/gmp-clearkey|; @RESPATH@/gmp-clearkey|g' browser/installer/package-manifest.in

# Remove default permissions
$SED -i -e 's|@RESPATH@/browser/defaults/permissions|; @RESPATH@/browser/defaults/permissions|g' browser/installer/package-manifest.in
$SED -i -e 's|FINAL_TARGET_FILES.defaults += ["app/permissions"]|# FINAL_TARGET_FILES.defaults += ["app/permissions"]|g' browser/moz.build
rm -vf browser/app/permissions

# Remove the ping sender
$SED -i -e 's|@BINPATH@/pingsender|; @BINPATH@/pingsender|g' browser/installer/package-manifest.in

# Remove unwanted `about`` pages
$SED -i -e "s|'asrouter'|# 'asrouter'|g" browser/components/about/components.conf
$SED -i -e "s|'firefoxview'|# 'firefoxview'|g" browser/components/about/components.conf
$SED -i -e "s|'logins'|# 'logins'|g" browser/components/about/components.conf
$SED -i -e "s|'loginsimportreport'|# 'loginsimportreport'|g" browser/components/about/components.conf
$SED -i -e "s|'messagepreview'|# 'messagepreview'|g" browser/components/about/components.conf
$SED -i -e "s|'privatebrowsing'|# 'privatebrowsing'|g" browser/components/about/components.conf
$SED -i -e "s|'profiling'|# 'profiling'|g" browser/components/about/components.conf
$SED -i -e "s|'reader'|# 'reader'|g" browser/components/about/components.conf
$SED -i -e "s|'sessionrestore'|# 'sessionrestore'|g" browser/components/about/components.conf
$SED -i -e "s|'welcome'|# 'welcome'|g" browser/components/about/components.conf
$SED -i -e "s|'welcomeback'|# 'welcomeback'|g" browser/components/about/components.conf
$SED -i -e "s|'webrtc'|# 'webrtc'|g" docshell/build/components.conf

$SED -i -e "s|about_pages.append('translations')|# about_pages.append('translations')|g" docshell/build/components.conf
$SED -i -e "s|about_pages.append('webauthn')|# about_pages.append('webauthn')|g" docshell/build/components.conf

# Remove unwanted/unused local dumps

## Cookie banner blocking rules
$SED -i -e 's|"cookie-banner-rules-list.json"|# "cookie-banner-rules-list.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/cookie-banner-rules-list.json

## DevTools metadata
$SED -i -e 's|"devtools-compatibility-browsers.json"|# "devtools-compatibility-browsers.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"devtools-devices.json"|# "devtools-devices.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/devtools-compatibility-browsers.json
rm -vf services/settings/dumps/main/devtools-devices.json

## Dictionaries
$SED -i -e 's|"language-dictionaries.json"|# "language-dictionaries.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/language-dictionaries.json

## DoH config/rollout
$SED -i -e 's|"doh-config.json"|# "doh-config.json"|g' services/settings/static-dumps/main/moz.build
$SED -i -e 's|"doh-providers.json"|# "doh-providers.json"|g' services/settings/static-dumps/main/moz.build
rm -vf services/settings/static-dumps/main/doh-config.json
rm -vf services/settings/static-dumps/main/doh-providers.json

## Password rules/recipes
$SED -i -e 's|"password-recipes.json"|# "password-recipes.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"password-rules.json"|# "password-rules.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"websites-with-shared-credential-backends.json"|# "websites-with-shared-credential-backends.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/password-recipes.json
rm -vf services/settings/dumps/main/password-rules.json
rm -vf services/settings/websites-with-shared-credential-backends.json

## Search configuration
$SED -i -e 's|"search-config-icons.json"|# "search-config-icons.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"search-config-icons/|# "search-config-icons/|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"search-config-overrides-v2.json"|# "search-config-overrides-v2.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"search-default-override-allowlist.json"|# "search-default-override-allowlist.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"urlbar-persisted-search-terms.json"|# "urlbar-persisted-search-terms.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/search-config-icons.json
rm -vf services/settings/dumps/main/search-config-overrides-v2.json
rm -vf services/settings/dumps/main/search-default-override-allowlist.json
rm -vf services/settings/dumps/main/urlbar-persisted-search-terms.json
rm -vrf services/settings/dumps/main/search-config-icons

## Search telemetry
$SED -i -e 's|"search-telemetry-v2.json"|# "search-telemetry-v2.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/search-telemetry-v2.json

## Site classification
$SED -i -e 's|"sites-classification.json"|# "sites-classification.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/sites-classification.json

## Top sites
$SED -i -e 's|"top-sites.json"|# "top-sites.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/top-sites.json

## Translations
$SED -i -e 's|"translations-models.json"|# "translations-models.json"|g' services/settings/dumps/main/moz.build
$SED -i -e 's|"translations-wasm.json"|# "translations-wasm.json"|g' services/settings/dumps/main/moz.build
rm -vf services/settings/dumps/main/translations-models.json
rm -vf services/settings/dumps/main/translations-wasm.json

# Remove unwanted/unused built-in extensions
$SED -i -e 's|"formautofill"|# "formautofill"|g' browser/extensions/moz.build
$SED -i -e 's|"ipp-activator"|# "ipp-activator"|g' browser/extensions/moz.build
$SED -i -e 's|"newtab"|# "newtab"|g' browser/extensions/moz.build
$SED -i -e 's|"search-detection"|# "search-detection"|g' browser/extensions/moz.build
$SED -i -e 's|category browser-first-window-ready resource:///modules/AboutNewTab.sys.mjs|# category browser-first-window-ready resource:///modules/AboutNewTab.sys.mjs|g' browser/components/BrowserComponents.manifest

# Nuke undesired Mozilla endpoints
source "$rootdir/scripts/noop_mozilla_endpoints.sh"

{
    echo 'ac_add_options --disable-address-sanitizer-reporter'
    echo 'ac_add_options --disable-artifact-builds'
    echo 'ac_add_options --disable-backgroundtasks'
    echo 'ac_add_options --disable-browser-newtab-as-addon'
    echo 'ac_add_options --disable-callgrind'
    echo 'ac_add_options --disable-crashreporter'
    echo 'ac_add_options --disable-debug'
    echo 'ac_add_options --disable-debug-js-modules'
    echo 'ac_add_options --disable-debug-symbols'
    echo 'ac_add_options --disable-default-browser-agent'
    echo 'ac_add_options --disable-dtrace'
    echo 'ac_add_options --disable-dump-painting'
    echo 'ac_add_options --disable-eme'
    echo 'ac_add_options --disable-execution-tracing'
    echo 'ac_add_options --disable-extensions-webidl-bindings'
    echo 'ac_add_options --disable-gecko-profiler'
    echo 'ac_add_options --disable-geckodriver'
    echo 'ac_add_options --disable-gtest-in-build'
    echo 'ac_add_options --disable-instruments'
    echo 'ac_add_options --disable-jit'
    echo 'ac_add_options --disable-jitdump'
    echo 'ac_add_options --disable-js-shell'
    echo 'ac_add_options --disable-jxl'
    echo 'ac_add_options --disable-layout-debugger'
    echo 'ac_add_options --disable-logrefcnt'
    echo 'ac_add_options --disable-necko-wifi'
    echo 'ac_add_options --disable-negotiateauth'
    echo 'ac_add_options --disable-nodejs'
    echo 'ac_add_options --disable-parental-controls'
    echo 'ac_add_options --disable-phc'
    echo 'ac_add_options --disable-pref-extensions'
    echo 'ac_add_options --disable-profiling'
    echo 'ac_add_options --disable-real-time-tracing'
    echo 'ac_add_options --disable-reflow-perf'
    echo 'ac_add_options --disable-rust-debug'
    echo 'ac_add_options --disable-rust-tests'
    echo 'ac_add_options --disable-simulator'
    echo 'ac_add_options --disable-spidermonkey-telemetry'
    echo 'ac_add_options --disable-synth-speechd'
    echo 'ac_add_options --disable-system-extension-dirs'
    echo 'ac_add_options --disable-system-policies'
    echo 'ac_add_options --disable-tests'
    echo 'ac_add_options --disable-uniffi-fixtures'
    echo 'ac_add_options --disable-unverified-updates'
    echo 'ac_add_options --disable-updater'
    echo 'ac_add_options --disable-vtune'
    echo 'ac_add_options --disable-wasm-codegen-debug'
    echo 'ac_add_options --disable-wasm-jspi'
    echo 'ac_add_options --disable-webdriver'
    echo 'ac_add_options --disable-webrender-debugger'
    echo 'ac_add_options --disable-webrtc'
    echo 'ac_add_options --disable-webspeech'
    echo 'ac_add_options --disable-webspeechtestbackend'
    echo 'ac_add_options --disable-wmf'
    echo 'ac_add_options --enable-application=browser'
    echo 'ac_add_options --enable-bundled-fonts'
    echo 'ac_add_options --enable-disk-remnant-avoidance'
    echo 'ac_add_options --enable-hardening'
    echo 'ac_add_options --enable-install-strip'
    echo 'ac_add_options --enable-minify=properties'
    echo 'ac_add_options --enable-optimize'
    echo 'ac_add_options --enable-proxy-bypass-protection'
    echo 'ac_add_options --enable-release'
    echo 'ac_add_options --enable-replace-malloc'
    echo 'ac_add_options --enable-rust-simd'
    echo 'ac_add_options --enable-sandbox'
    echo 'ac_add_options --enable-strip'
    echo 'ac_add_options --enable-update-channel=release'
    echo 'ac_add_options --enable-wasm-branch-hinting'
    echo 'ac_add_options --enable-wasm-memory-control'
    echo 'ac_add_options --with-app-basename=stremio-gecko'
    echo 'ac_add_options --with-app-name=stremio-gecko'
    echo 'ac_add_options --with-branding=browser/branding/stremio-gecko'

    echo 'ac_add_options --with-crashreporter-url="data;"'
    echo 'ac_add_options --with-distribution-id=dev.celenity'

    if [[ -n "${target}" ]]; then
        echo "ac_add_options --target=$target"
    fi

    echo "ac_add_options --with-libclang-path=\"$libclang\""
    echo "ac_add_options --with-wasi-sysroot=\"$wasi_install/share/wasi-sysroot\""
    echo 'ac_add_options --without-adjust-sdk-keyfile'
    echo 'ac_add_options --without-bing-api-keyfile'
    echo 'ac_add_options --without-google-location-service-api-keyfile'
    echo 'ac_add_options --without-mozilla-api-keyfile'
    echo 'ac_add_options --without-leanplum-sdk-keyfile'
    echo 'ac_add_options --without-pocket-api-keyfile'

    if [[ -n ${SB_GAPI_KEY_FILE+x} ]]; then
        echo "ac_add_options --with-google-safebrowsing-api-keyfile=${SB_GAPI_KEY_FILE}"
    fi

    echo "ac_add_options WASM_CC=\"$wasi_install/bin/clang\""
    echo "ac_add_options WASM_CXX=\"$wasi_install/bin/clang++\""
    echo 'mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/obj'

    echo 'export MOZ_APP_BASENAME=stremio-gecko'
    echo 'export MOZ_APP_NAME=stremio-gecko'
    echo 'export MOZ_APP_REMOTINGNAME=stremio-gecko'

    echo 'export MOZ_ARTIFACT_BUILDS='
    echo 'export MOZ_CALLGRIND='
    echo 'export MOZ_CRASHREPORTER='
    echo 'export MOZ_CRASHREPORTER_URL="data;"'
    echo 'export MOZ_DEBUG_FLAGS='
    echo 'export MOZ_EXECUTION_TRACING='
    echo 'export MOZ_INCLUDE_SOURCE_INFO=1'
    echo 'export MOZ_INSTRUMENTS='
    echo 'export MOZ_LTO=1'
    echo 'export MOZ_PACKAGE_JSSHELL='
    echo 'export MOZ_PGO=1'
    echo 'export MOZ_PHC='
    echo 'export MOZ_PROFILING='
    echo 'export MOZ_REQUIRE_SIGNING='
    echo 'export MOZ_RUST_SIMD=1'
    echo 'export MOZ_SECURITY_HARDENING=1'
    echo 'export MOZ_TELEMETRY_REPORTING='
    echo 'export MOZ_VTUNE='
    echo 'export MOZILLA_OFFICIAL=1'
    echo 'export NODEJS='
    echo 'export RUSTC_OPT_LEVEL=2'
} >>mozconfig

{
    cat "$phoenix/phoenix-$phoenixplatform.js"
    cat "$phoenix/phoenix-extended-$phoenixplatform.js"
    cat "$gecko_patches/preferences/stremio-gecko.js"
} >>browser/app/profile/firefox.js

{
    cat "$ironfox/preferences/pdf.js"
} >>toolkit/components/pdfjs/PdfJsOverridePrefs.js

# Apply Gecko overlay
apply_overlay "$gecko_patches/gecko-overlay/"
apply_overlay "$neutron/"

popd
