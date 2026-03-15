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

run_quality_gates

if [ -n "$ERRORS" ]; then
    echo -e "QUALITY GATE FAILED:\n$ERRORS"
    exit 2
fi

exit 0
