#!/bin/bash
# PostToolUse hook: remind about visual verification after component edits

FILE_PATH="$CLAUDE_FILE_PATH"

# Only for component tsx/scss files
if [[ "$FILE_PATH" =~ src/components/.*\.(tsx|scss)$ ]]; then
  if [[ ! "$FILE_PATH" =~ \.stories\. ]] && [[ ! "$FILE_PATH" =~ \.test\. ]]; then
    echo "Reminder: Verify this component visually in Storybook (localhost:6006) via Playwright MCP screenshot."
  fi
fi

exit 0
