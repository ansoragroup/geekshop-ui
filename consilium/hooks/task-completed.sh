#!/bin/bash
# consilium/hooks/task-completed.sh
# Quality gates for completed tasks. Universal — auto-detects project type.
# Exit 0 = pass, Exit 2 = fail (send feedback to agent)

ERRORS=""

run_quality_gates() {
    # JavaScript/TypeScript
    if [ -f "package.json" ]; then
        if grep -q '"lint"' package.json 2>/dev/null; then
            OUTPUT=$(npm run lint 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nLINT FAILURES:\n$OUTPUT"
        fi
        if [ -f "tsconfig.json" ]; then
            OUTPUT=$(npx tsc --noEmit 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nTYPE ERRORS:\n$OUTPUT"
        fi
        if grep -q '"test"' package.json 2>/dev/null; then
            OUTPUT=$(npm test -- --passWithNoTests --bail 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nTEST FAILURES:\n$OUTPUT"
        fi
    fi

    # PHP/Laravel
    if [ -f "composer.json" ]; then
        if [ -f "vendor/bin/pint" ]; then
            OUTPUT=$(vendor/bin/pint --test 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nPINT STYLE ERRORS:\n$OUTPUT"
        fi
        if [ -f "vendor/bin/phpstan" ]; then
            OUTPUT=$(vendor/bin/phpstan analyse --no-progress --memory-limit=512M 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nPHPSTAN ERRORS:\n$OUTPUT"
        fi
        if [ -f "artisan" ]; then
            OUTPUT=$(php artisan test --stop-on-failure 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nTEST FAILURES:\n$OUTPUT"
        fi
    fi

    # Python
    if [ -f "pyproject.toml" ] || [ -f "setup.py" ] || [ -f "requirements.txt" ]; then
        if command -v ruff &>/dev/null; then
            OUTPUT=$(ruff check . 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nRUFF LINT:\n$OUTPUT"
        fi
        if command -v pytest &>/dev/null; then
            OUTPUT=$(python -m pytest --tb=short -q 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nPYTEST FAILURES:\n$OUTPUT"
        fi
        if command -v mypy &>/dev/null && [ -f "mypy.ini" -o -f "pyproject.toml" ]; then
            OUTPUT=$(mypy . 2>&1)
            [ $? -ne 0 ] && ERRORS="$ERRORS\n\nMYPY TYPE ERRORS:\n$OUTPUT"
        fi
    fi

    # Rust
    if [ -f "Cargo.toml" ]; then
        OUTPUT=$(cargo clippy 2>&1)
        [ $? -ne 0 ] && ERRORS="$ERRORS\n\nCLIPPY:\n$OUTPUT"
        OUTPUT=$(cargo test 2>&1)
        [ $? -ne 0 ] && ERRORS="$ERRORS\n\nCARGO TEST:\n$OUTPUT"
    fi

    # Go
    if [ -f "go.mod" ]; then
        OUTPUT=$(go vet ./... 2>&1)
        [ $? -ne 0 ] && ERRORS="$ERRORS\n\nGO VET:\n$OUTPUT"
        OUTPUT=$(go test ./... 2>&1)
        [ $? -ne 0 ] && ERRORS="$ERRORS\n\nGO TEST:\n$OUTPUT"
    fi
}

# GeekShop-specific quality gates
run_geekshop_gates() {
    if ! grep -q '"@geekshop/ui"\|"@ansoragroup/ui"' package.json 2>/dev/null; then
        return
    fi

    # Gate: Library build
    if grep -q '"build:lib"' package.json 2>/dev/null; then
        OUTPUT=$(npm run build:lib 2>&1)
        [ $? -ne 0 ] && ERRORS="$ERRORS\n\nBUILD:LIB FAILURE:\n$OUTPUT"
    fi

    # Gate: SCSS token compliance (modified files only)
    MODIFIED_SCSS=$(git diff --cached --name-only 2>/dev/null | grep "\.module\.scss$")
    if [ -z "$MODIFIED_SCSS" ]; then
        MODIFIED_SCSS=$(git diff --name-only HEAD 2>/dev/null | grep "\.module\.scss$")
    fi
    if [ -n "$MODIFIED_SCSS" ]; then
        for scss_file in $MODIFIED_SCSS; do
            [ -f "$scss_file" ] || continue
            HEX_HITS=$(grep -nE '(background|[^-]color|border-color)\s*:.*#[0-9A-Fa-f]{3,8}' "$scss_file" 2>/dev/null \
                | grep -v '//' | grep -v 'var(--' | grep -v '\$color-' | grep -v '\$bg-')
            if [ -n "$HEX_HITS" ]; then
                ERRORS="$ERRORS\n\nHARDCODED HEX in $scss_file:\n$HEX_HITS\nUse var(--gs-*) instead."
            fi
        done
    fi
}

# Collect RTPL raw artifacts (non-blocking)
collect_rtpl_artifacts() {
    EVIDENCE_RAW="/tmp/consilium/current/evidence/raw"
    [ -d "/tmp/consilium/current" ] || return
    mkdir -p "$EVIDENCE_RAW"

    if [ -f "package.json" ]; then
        npm run lint 2>&1 > "$EVIDENCE_RAW/lint.txt" 2>&1 || true
        npm test -- --passWithNoTests 2>&1 > "$EVIDENCE_RAW/test-unit.txt" 2>&1 || true
        npm run build:lib 2>&1 > "$EVIDENCE_RAW/build.txt" 2>&1 || true
        npx tsc --noEmit 2>&1 > "$EVIDENCE_RAW/typecheck.txt" 2>&1 || true
    fi
}

run_quality_gates
run_geekshop_gates
collect_rtpl_artifacts

if [ -n "$ERRORS" ]; then
    echo -e "QUALITY GATE FAILED:\n$ERRORS"
    exit 2
fi

exit 0
