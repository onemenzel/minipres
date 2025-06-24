#!/usr/bin/env bash
set -euo pipefail

if ! command -v claude; then
	npm install -g -f @anthropic-ai/claude-code
else
	npm upgrade -g -f @anthropic-ai/claude-code
fi

claude
