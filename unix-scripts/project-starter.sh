#!/bin/bash
set -e

set -o allexport
source .env
set +o allexport

COMPOSE_FILE="./docker/compose-files/docker-compose.${DOCKER_MODE}.yml"

if ! docker network ls --format '{{.Name}}' | grep -qw "$NETWORK_NAME"; then
  echo "Creating network: $NETWORK_NAME"
  docker network create "$NETWORK_NAME"
else
  echo "Network $NETWORK_NAME already exists"
fi

echo "Starting containers with: $COMPOSE_FILE"
docker-compose -f "$COMPOSE_FILE" up --build --remove-orphans