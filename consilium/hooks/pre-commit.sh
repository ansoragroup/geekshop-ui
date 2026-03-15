#!/bin/bash
# consilium/hooks/pre-commit.sh
# Verifies file boundaries and runs pre-commit checks.
# Exit 0 = ok, Exit 2 = violation (block commit)

PLAN="/tmp/consilium/current/phase4/PLAN.md"
ERRORS=""

# Check file boundary violations (only during active consilium session)
if [ -f "$PLAN" ] && [ -n "$CLAUDE_CODE_AGENT_NAME" ]; then
    AGENT="$CLAUDE_CODE_AGENT_NAME"
    STAGED=$(git diff --cached --name-only 2>/dev/null)

    if [ -n "$STAGED" ]; then
        # Extract file ownership from plan
        OWNED_PATTERN=$(grep -A5 "owner: $AGENT" "$PLAN" 2>/dev/null | grep "files:" | sed 's/.*files: //')

        if [ -n "$OWNED_PATTERN" ]; then
            while IFS= read -r file; do
                MATCH=false
                for pattern in $OWNED_PATTERN; do
                    if [[ "$file" == $pattern ]]; then
                        MATCH=true
                        break
                    fi
                done
                if [ "$MATCH" = false ]; then
                    ERRORS="$ERRORS\nBOUNDARY VIOLATION: $AGENT modified $file (not in owned files)"
                fi
            done <<< "$STAGED"
        fi
    fi
fi

if [ -n "$ERRORS" ]; then
    echo -e "FILE BOUNDARY VIOLATIONS DETECTED:\n$ERRORS"
    exit 2
fi

exit 0
