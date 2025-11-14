#!/bin/bash

if [[ "$env_source" != "true" ]]; then
    echo "Use 'source scripts/env_local.sh' before calling prebuild or build"
    return 1
fi

source "$rootdir/scripts/versions.sh"

RED="\033[0;31m"
GREEN="\033[0;32m"
NC="\033[0m"

declare -a IRONFOX_GECKO_PATCH_FILES
declare -a STREMIO_GECKO_PATCH_FILES
IRONFOX_GECKO_PATCH_FILES=($(yq '.patches[].file' "$(dirname "$0")"/ironfox-patches.yaml))
STREMIO_GECKO_PATCH_FILES=($(yq '.patches[].file' "$(dirname "$0")"/gecko-patches.yaml))

ironfox_gecko_check_patch() {
    patch="$patches/gecko/ironfox/$1"
    if ! [[ -f "$patch" ]]; then
        printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        echo "'$patch' does not exist or is not a file"
        return 1
    fi

    if ! patch -p1 -f --dry-run <"$patch"; then
        printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        echo "Incompatible patch: '$patch'"
        return 1
    fi
}

stremio_gecko_check_patch() {
    patch="$patches/gecko/stremio-gecko/$1"
    if ! [[ -f "$patch" ]]; then
        printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        echo "'$patch' does not exist or is not a file"
        return 1
    fi

    if ! patch -p1 -f --dry-run <"$patch"; then
        printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        echo "Incompatible patch: '$patch'"
        return 1
    fi
}

ironfox_gecko_check_patches() {
    for patch in "${IRONFOX_GECKO_PATCH_FILES[@]}"; do
        if ! ironfox_gecko_check_patch "$patch"; then
            return 1
        fi
    done
}

stremio_gecko_check_patches() {
    for patch in "${STREMIO_GECKO_PATCH_FILES[@]}"; do
        if ! stremio_gecko_check_patch "$patch"; then
            return 1
        fi
    done
}

ironfox_gecko_test_patches() {
    for patch in "${IRONFOX_GECKO_PATCH_FILES[@]}"; do
        if ! ironfox_gecko_check_patch "$patch" >/dev/null 2>&1; then
            printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        else
            printf "${GREEN}✓ %-45s: OK${NC}\n" "$(basename "$patch")"
        fi
    done
}

stremio_gecko_test_patches() {
    for patch in "${STREMIO_GECKO_PATCH_FILES[@]}"; do
        if ! stremio_gecko_check_patch "$patch" >/dev/null 2>&1; then
            printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
        else
            printf "${GREEN}✓ %-45s: OK${NC}\n" "$(basename "$patch")"
        fi
    done
}

ironfox_gecko_apply_patch() {
    name="$1"
    echo "Applying patch: $name"
    stremio_gecko_check_patch "$name" || return 1
    patch -p1 --no-backup-if-mismatch <"$patches/gecko/ironfox/$name"
    return $?
}

stremio_gecko_apply_patch() {
    name="$1"
    echo "Applying patch: $name"
    stremio_gecko_check_patch "$name" || return 1
    patch -p1 --no-backup-if-mismatch <"$patches/gecko/stremio-gecko/$name"
    return $?
}

ironfox_gecko_apply_patches() {
    for patch in "${IRONFOX_GECKO_PATCH_FILES[@]}"; do
        if ! ironfox_gecko_apply_patch "$patch"; then
            printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
            echo "Failed to apply $patch"
            return 1
        fi
    done
}

stremio_gecko_apply_patches() {
    for patch in "${STREMIO_GECKO_PATCH_FILES[@]}"; do
        if ! stremio_gecko_apply_patch "$patch"; then
            printf "${RED}✗ %-45s: FAILED${NC}\n" "$(basename "$patch")"
            echo "Failed to apply $patch"
            return 1
        fi
    done
}

ironfox_gecko_list_patches() {
    for patch in "${IRONFOX_GECKO_PATCH_FILES[@]}"; do
        echo "$patch"
    done
}

stremio_gecko_list_patches() {
    for patch in "${STREMIO_GECKO_PATCH_FILES[@]}"; do
        echo "$patch"
    done
}

slugify() {
    local input="$1"
    echo "$input" |                  \
        tr '[:upper:]' '[:lower:]' | \
        "$SED" -E 's/[^a-z0-9]+/-/g' |  \
        "$SED" -E 's/^-+|-+$//g'
}
