#!/bin/bash
# PostToolUse hook: run tsc after .ts/.tsx file edits to catch type errors early
# Runs async so it doesn't block editing flow

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_response.filePath // .tool_input.file_path // empty')

# Only run for TypeScript files
if [ -z "$FILE_PATH" ] || [[ ! "$FILE_PATH" =~ \.(tsx?|ts)$ ]]; then
  exit 0
fi

# Skip test/story files — they rarely cause cascading errors
if [[ "$FILE_PATH" =~ \.(test|stories)\.(tsx?|ts)$ ]]; then
  exit 0
fi

# Run typecheck, capture first 20 lines of errors
ERRORS=$(npx tsc --noEmit --pretty 2>&1 | head -20)

if [ $? -ne 0 ]; then
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"TypeScript errors after editing $FILE_PATH:\\n$ERRORS\"}}"
else
  exit 0
fi
