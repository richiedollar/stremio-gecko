#!/bin/bash
# shellcheck disable=SC2034

# Sources
FIREFOX_VERSION="145.0"
GECKO_STREMIO_VERSION="${FIREFOX_VERSION}"
FIREFOX_RELEASE_TAG="FIREFOX_${FIREFOX_VERSION//./_}_RELEASE"
#FIREFOX_RELEASE_TAG="FIREFOX-ANDROID_${FIREFOX_VERSION//./_}_BUILD1"
#FIREFOX_RELEASE_TAG="FIREFOX-ANDROID_${FIREFOX_VERSION//./_}_BUILD2"
FIREFOX_RELEASE_PATH="releases/${FIREFOX_VERSION}"
IRONFOX_VERSION="v${FIREFOX_VERSION}"
PHOENIX_TAG="2025.11.07.1"

## Neutron is a weird case - they don't have proper versioning, so we just specify the commit here
NEUTRON_REVISION="64e14b9b3adac2a2c8d461348ee04c553dfd8305"

# Tools
#RUST_MAJOR_VERSION="1.91"
#RUST_VERSION="${RUST_MAJOR_VERSION}.0"
RUST_MAJOR_VERSION="1.91.1"
RUST_VERSION="1.91.1"
CBINDGEN_VERSION="0.29.0"

# Configuration
ROOTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_SH="${ROOTDIR}/scripts/env_local.sh"
BUILDDIR="${ROOTDIR}/build"
PATCHDIR="${ROOTDIR}/patches"
SOURCESDIR="${ROOTDIR}/sources"
GECKODIR="${SOURCESDIR}/gecko"
GECKOPATCHDIR="${PATCHDIR}/gecko"
IRONFOXDIR="${SOURCESDIR}/ironfox"
IRONFOXPATCHDIR="${IRONFOXDIR}/patches"
NEUTRONDIR="${SOURCESDIR}/neutron"
PHOENIXDIR="${SOURCESDIR}/phoenix"

# Use GNU Sed on macOS instead of the built-in sed, due to differences in syntax
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED=gsed
else
    SED=sed
fi
