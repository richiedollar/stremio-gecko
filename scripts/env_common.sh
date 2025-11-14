#!/bin/bash

# Caution: Should not be sourced directly!
# Use 'env_local.sh' or 'env_fdroid.sh' instead.

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

# Set locations for GNU make + nproc
if [[ "$PLATFORM" == "darwin" ]]; then
    export MAKE_LIB="gmake"
    export NPROC_LIB="sysctl -n hw.logicalcpu"
else
    export MAKE_LIB="make"
    export NPROC_LIB="nproc"
fi

# Configure Mach
## https://firefox-source-docs.mozilla.org/mach/usage.html#user-settings
## https://searchfox.org/mozilla-central/rev/f008b9aa/python/mach/mach/telemetry.py#95
## https://searchfox.org/mozilla-central/rev/f008b9aa/python/mach/mach/telemetry.py#284
export DISABLE_TELEMETRY=1
export MACHRC="$patches/gecko/ironfox/machrc"
export MOZCONFIG="$mozilla_release/mozconfig"

export STREMIO_GECKO_LOCALES=$(<"$patches/gecko/ironfox/locales")

export NSS_STATIC=1

export ARTIFACTS="$rootdir/artifacts"

export env_source="true"

if [[ -z ${CARGO_HOME+x} ]]; then
    export CARGO_HOME=$HOME/.cargo
fi
