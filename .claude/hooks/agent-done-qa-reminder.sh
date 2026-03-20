#!/bin/bash
# Notification hook: remind about Playwright visual QA when an agent completes
# Fires on TaskCompleted / agent completion notifications

echo '{"systemMessage":"Agent task completed. Remember: verify visually via Playwright MCP screenshot at desktop viewport (1280x800) before marking done."}'
