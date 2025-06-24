#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
source .env

set -x

if [ "${1:-x}" == "recreate" ]; then
	$CLAUDE_CONTAINER_HOST stop $CLAUDE_CONTAINER_NAME
	$CLAUDE_CONTAINER_HOST rm $CLAUDE_CONTAINER_NAME
fi

# reminder to NEVER use relative directories for bind mounts,
# as these will somehow be interpreted as /
$CLAUDE_CONTAINER_HOST run \
	--name $CLAUDE_CONTAINER_NAME \
	-it --env-file $PWD/.env \
	--mount type=volume,chown,src=home,dst=/root \
	--mount type=bind,src=$PWD,dst=/root/project \
	--mount type=bind,ro,src=$PWD/claude.sh,dst=/root/project/claude.sh \
	gitlab.studiumdigitale.uni-frankfurt.de/dipfxsd/tools/claude-container:latest \
|| $CLAUDE_CONTAINER_HOST start -ai $CLAUDE_CONTAINER_NAME
