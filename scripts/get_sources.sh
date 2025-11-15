#!/usr/bin/env bash

set -euo pipefail

source "$(dirname $0)/versions.sh"

if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM=macos
else
    PLATFORM=linux
fi

clone_repo() {
    url="$1"
    path="$2"
    tag="$3"

    if [[ "$url" == "" ]]; then
        echo "URL missing for clone"
        exit 1
    fi

    if [[ "$path" == "" ]]; then
        echo "Path is required for cloning '$url'"
        exit 1
    fi

    if [[ "$tag" == "" ]]; then
        echo "Tag name is required for cloning '$url'"
        exit 1
    fi

    if [[ -f "$path" ]]; then
        echo "'$path' exists and is not a directory"
        exit 1
    fi

    if [[ -d "$path" ]]; then
        echo "'$path' already exists"
        read -p "Do you want to re-clone this repository? [y/N] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Nn]$ ]]; then
            return 0
        fi
    fi

    echo "Cloning $url::$tag"
    git clone --branch "$tag" --depth=1 "$url" "$path"
}

download() {
    local url="$1"
    local filepath="$2"

    if [[ "$url" == "" ]]; then
        echo "URL is required (file: '$filepath')"
        exit 1
    fi

    if [ -f "$filepath" ]; then
        echo "$filepath already exists."
        read -p "Do you want to re-download? [y/N] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "Removing $filepath..."
            rm -f "$filepath"
        else
            return 0
        fi
    fi

    mkdir -vp "$(dirname "$filepath")"

    echo "Downloading $url"
    wget --https-only --no-cache --secure-protocol=TLSv1_3 --show-progress --verbose "$url" -O "$filepath"
}

# Extract zip removing top level directory
extract_rmtoplevel() {
    local archive_path="$1"
    local to_name="$2"
    local extract_to="${ROOTDIR}/$to_name"

    if ! [[ -f "$archive_path" ]]; then
        echo "Archive '$archive_path' does not exist!"
    fi

    # Create temporary directory for extraction
    local temp_dir=$(mktemp -d)

    # Extract based on file extension
    case "$archive_path" in
        *.zip)
            unzip -q "$archive_path" -d "$temp_dir"
            ;;
        *.tar.gz)
            tar xzf "$archive_path" -C "$temp_dir"
            ;;
        *.tar.xz)
            tar xJf "$archive_path" -C "$temp_dir"
            ;;
        *.tar.zst)
            tar --zstd -xvf "$archive_path" -C "$temp_dir"
            ;;
        *)
            echo "Unsupported archive format: $archive_path"
            rm -rf "$temp_dir"
            exit 1
            ;;
    esac

    local top_dir=$(ls "$temp_dir")
    local to_parent=$(dirname "$extract_to")

    rm -rf "$extract_to"
    mkdir -vp "$to_parent"
    mv "$temp_dir/$top_dir" "$to_parent/$to_name"

    rm -rf "$temp_dir"
}

download_and_extract() {
    local repo_name="$1"
    local url="$2"

    local extension
    if [[ "$url" =~ \.tar\.xz$ ]]; then
        extension=".tar.xz"
    elif [[ "$url" =~ \.tar\.gz$ ]]; then
        extension=".tar.gz"
    elif [[ "$url" =~ \.tar\.zst$ ]]; then
        extension=".tar.zst"
    else
        extension=".zip"
    fi

    local repo_archive="${BUILDDIR}/${repo_name}${extension}"

    download "$url" "$repo_archive"

    if [ ! -f "$repo_archive" ]; then
        echo "Source archive for $repo_name does not exist."
        exit 1
    fi

    echo "Extracting $repo_archive"
    extract_rmtoplevel "$repo_archive" "$repo_name"
    echo
}

mkdir -vp "$BUILDDIR"

# Download CSS we borrow from Neutron
echo "Downloading Neutron CSS..."
## Neutron is a weird case - they don't have proper versioning, so we just specify the commit here

## Shared
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/shared/webRTC-indicator.css" "$NEUTRONDIR/browser/themes/shared/webRTC-indicator.css"

## Linux
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/linux/browser.css" "$NEUTRONDIR/browser/themes/linux/browser.css"
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/linux/webRTC-indicator.css" "$NEUTRONDIR/browser/themes/linux/webRTC-indicator.css"

## macOS
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/osx/browser.css" "$NEUTRONDIR/browser/themes/osx/browser.css"
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/osx/webRTC-indicator.css" "$NEUTRONDIR/browser/themes/osx/webRTC-indicator.css"

## Windows
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/windows/browser.css" "$NEUTRONDIR/browser/themes/windows/browser.css"
download "https://github.com/gamingdoom/neutron/raw/$NEUTRON_REVISION/src/changed/browser/themes/windows/webRTC-indicator.css" "$NEUTRONDIR/browser/themes/windows/webRTC-indicator.css"

# Download patches/resources we borrow from IronFox
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-certificate-pinning.patch" "$IRONFOXPATCHDIR/gecko-certificate-pinning.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-configure-ublock-origin.patch" "$IRONFOXPATCHDIR/gecko-configure-ublock-origin.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-disable-network-id.patch" "$IRONFOXPATCHDIR/gecko-disable-network-id.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-disable-nimbus.patch" "$IRONFOXPATCHDIR/gecko-disable-nimbus.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-expose-hidden-aboutsupport-settings.patch" "$IRONFOXPATCHDIR/gecko-expose-hidden-aboutsupport-settings.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-prevent-extensions-from-changing-browser-settings.patch" "$IRONFOXPATCHDIR/gecko-prevent-extensions-from-changing-browser-settings.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-remove-abouttelemetry.patch" "$IRONFOXPATCHDIR/gecko-remove-abouttelemetry.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-remove-gmp-sources.patch" "$IRONFOXPATCHDIR/gecko-remove-gmp-sources.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-remove-privileged-addon-signing-status.patch" "$IRONFOXPATCHDIR/gecko-remove-privileged-addon-signing-status.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/gecko-rs-blocker.patch" "$IRONFOXPATCHDIR/gecko-rs-blocker.patch"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/locales" "$IRONFOXPATCHDIR/locales"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/machrc" "$IRONFOXPATCHDIR/machrc"
download "https://gitlab.com/ironfox-oss/IronFox/-/raw/$IRONFOX_VERSION/patches/preferences/pdf.js" "$IRONFOXDIR/preferences/pdf.js"

# Download Phoenix
echo "Downloading Phoenix..."

## Linux
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/linux/defaults/pref/phoenix-desktop.js" "$PHOENIXDIR/phoenix-linux.js"
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/unused/linux/phoenix-extended.js" "$PHOENIXDIR/phoenix-extended-linux.js"

## macOS
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/unused/macos/phoenix.js" "$PHOENIXDIR/phoenix-macos.js"
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/unused/macos/phoenix-extended.js" "$PHOENIXDIR/phoenix-extended-macos.js"

## Windows
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/unused/windows/phoenix.js" "$PHOENIXDIR/phoenix-windows.js"
download "https://gitlab.com/celenityy/Phoenix/-/raw/$PHOENIX_TAG/unused/windows/phoenix-extended.js" "$PHOENIXDIR/phoenix-extended-windows.js"

# Clone stremio-web
echo "Cloning stremio-web..."
clone_repo "https://github.com/Stremio/stremio-web.git" "$STREMIOWEBDIR" "${STREMIO_WEB_TAG}"

# Clone Firefox
echo "Cloning Firefox..."
clone_repo "https://github.com/mozilla-firefox/firefox.git" "$GECKODIR" "${FIREFOX_RELEASE_TAG}"

# Write env_local.sh
echo "Writing ${ENV_SH}..."
cat > "$ENV_SH" << EOF
export rootdir=${ROOTDIR}
export builddir="${BUILDDIR}"
export patches=${PATCHDIR}
export sources=${SOURCESDIR}
export gecko=${GECKODIR}
export gecko_patches=${GECKOPATCHDIR}
export ironfox=${IRONFOXDIR}
export ironfox_patches=${IRONFOXPATCHDIR}
export neutron=${NEUTRONDIR}
export phoenix=${PHOENIXDIR}
export stremiowebdir=${STREMIOWEBDIR}

source "\$rootdir/scripts/env_common.sh"
EOF
