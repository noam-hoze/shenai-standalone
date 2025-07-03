#!/bin/bash

container_name="shen-standalone"

# Check if the container exists
if [ "$(docker inspect -f '{{.State.Status}}' $container_name 2>/dev/null)" ]; then
  echo "Stopping and removing existing container: $container_name"
  docker stop $container_name
  docker rm $container_name
else
  echo "No existing container named $container_name"
fi

# Note: You can optionally pull a remote image or leave the build+run to the GitLab script
# docker pull <image-name>:<tag>

echo "Ready to run a new container: $container_name"