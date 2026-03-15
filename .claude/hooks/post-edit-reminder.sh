#!/bin/bash
# PostToolUse hook: remind about visual verification after component edits
# Reads tool input from stdin JSON (Claude Code hook protocol)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only for component tsx/scss source files (not stories or tests)
if [ -n "$FILE_PATH" ] && [[ "$FILE_PATH" =~ src/components/.*\.(tsx|scss)$ ]]; then
  if [[ ! "$FILE_PATH" =~ \.stories\. ]] && [[ ! "$FILE_PATH" =~ \.test\. ]]; then
    echo "Reminder: Verify this component visually in Storybook (localhost:6006) via Playwright MCP screenshot."
  fi
fi

exit 0
