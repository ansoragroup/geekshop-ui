#!/bin/bash
# PreToolUse hook: enforce component development rules on Write/Edit
# Reads tool input from stdin JSON (Claude Code hook protocol)
# Exit 0 = allow (warnings go to stderr), Exit 2 = block

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Get the content being written/edited
# Write tool → .content, Edit tool → .new_string
CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty')

# Skip if no file path or not a component file
if [ -z "$FILE_PATH" ] || [[ ! "$FILE_PATH" =~ src/components/ ]]; then
  exit 0
fi

# Rule: .module.scss files with container-type MUST have width: 100%
if [[ "$FILE_PATH" =~ \.module\.scss$ ]]; then
  if echo "$CONTENT" | grep -q "container-type: inline-size" 2>/dev/null; then
    # For Edit tool, also check existing file content
    HAS_WIDTH=false
    if echo "$CONTENT" | grep -q "width: 100%" 2>/dev/null; then
      HAS_WIDTH=true
    elif [ -f "$FILE_PATH" ] && grep -q "width: 100%" "$FILE_PATH" 2>/dev/null; then
      HAS_WIDTH=true
    fi
    if [ "$HAS_WIDTH" = false ]; then
      echo "WARNING: container-type: inline-size detected without width: 100%. Add width: 100% to prevent collapse." >&2
    fi
  fi

  # Check for deprecated Sass functions — hard block
  if echo "$CONTENT" | grep -qE "(^|[^a-z])darken\(|(^|[^a-z])lighten\(" 2>/dev/null; then
    echo "BLOCKED: Deprecated Sass function detected. Use @use 'sass:color' and color.adjust() instead of darken()/lighten()." >&2
    exit 2
  fi
fi

# Rule: Story files must use width, not just maxWidth in decorators
if [[ "$FILE_PATH" =~ \.stories\.tsx$ ]]; then
  if echo "$CONTENT" | grep -q "maxWidth:" 2>/dev/null; then
    HAS_WIDTH=false
    if echo "$CONTENT" | grep -q "width:" 2>/dev/null; then
      HAS_WIDTH=true
    elif [ -f "$FILE_PATH" ] && grep -q "width:" "$FILE_PATH" 2>/dev/null; then
      HAS_WIDTH=true
    fi
    if [ "$HAS_WIDTH" = false ]; then
      echo "WARNING: Story decorator uses maxWidth without width. Container-type elements will collapse. Use width: 390 instead." >&2
    fi
  fi
fi

exit 0
