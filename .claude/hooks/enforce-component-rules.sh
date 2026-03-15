#!/bin/bash
# PreToolUse hook: enforce component development rules on Write/Edit
# Exit 0 = allow, Exit 2 = block

FILE_PATH="$CLAUDE_FILE_PATH"

# Skip non-component files
if [[ ! "$FILE_PATH" =~ src/components/ ]]; then
  exit 0
fi

# Rule: .module.scss files with container-type MUST have width: 100%
if [[ "$FILE_PATH" =~ \.module\.scss$ ]]; then
  if echo "$CLAUDE_TOOL_INPUT" | grep -q "container-type: inline-size" 2>/dev/null; then
    if ! echo "$CLAUDE_TOOL_INPUT" | grep -q "width: 100%" 2>/dev/null; then
      echo "WARNING: container-type: inline-size detected without width: 100%. Add width: 100% to prevent collapse." >&2
    fi
  fi

  # Check for deprecated Sass functions
  if echo "$CLAUDE_TOOL_INPUT" | grep -qE "(^|[^a-z])darken\(|(^|[^a-z])lighten\(" 2>/dev/null; then
    echo "BLOCKED: Deprecated Sass function detected. Use @use 'sass:color' and color.adjust() instead of darken()/lighten()." >&2
    exit 2
  fi
fi

# Rule: Story files must use width, not just maxWidth in decorators
if [[ "$FILE_PATH" =~ \.stories\.tsx$ ]]; then
  if echo "$CLAUDE_TOOL_INPUT" | grep -q "maxWidth:" 2>/dev/null; then
    if ! echo "$CLAUDE_TOOL_INPUT" | grep -q "width:" 2>/dev/null; then
      echo "WARNING: Story decorator uses maxWidth without width. Container-type elements will collapse. Use width: 390 instead." >&2
    fi
  fi
fi

exit 0
