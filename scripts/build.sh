#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 apk|bundle" >&1
    exit 1
fi

set -euo pipefail

# Set platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM=macos
else
    PLATFORM=linux
fi

build_type="$1"

if [ "$build_type" != "apk" ] && [ "$build_type" != "bundle" ]; then
    echo "Unknown build type: '$build_type'" >&1
    echo "Usage: $0 apk|bundle" >&1
    exit 1
fi

if [[ "$env_source" != "true" ]]; then
    echo "Use 'source scripts/env_local.sh' before calling prebuild or build"
    exit 1
fi

source "$CARGO_HOME/env"

pushd "$mozilla_release"

echo "Running ./mach build..."
./mach build
echo "Running ./mach package..."
./mach package
echo "Running ./mach package-multi-locale..."
./mach package-multi-locale --locales ${STREMIO_GECKO_LOCALES}

MOZ_CHROME_MULTILOCALE="${STREMIO_GECKO_LOCALES}"
export MOZ_CHROME_MULTILOCALE

popd
