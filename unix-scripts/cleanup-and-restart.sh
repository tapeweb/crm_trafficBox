#!/bin/bash
set -e

PROJECT_PREFIX="crm"
PROJECT_NETWORK="app_network"
PROJECT_VOLUMES="./docker/volumes"

echo "=== Stopping project containers ==="
docker ps -q --filter "name=${PROJECT_PREFIX}" | xargs -r docker stop

echo "=== Removing project containers ==="
docker ps -aq --filter "name=${PROJECT_PREFIX}" | xargs -r docker rm

echo "=== Removing project volumes ==="
docker volume ls --format '{{.Name}}' | grep "^${PROJECT_PREFIX}" | xargs -r docker volume rm
sudo rm -rf "$PROJECT_VOLUMES"

echo "=== Removing project network ==="
if docker network ls --format '{{.Name}}' | grep -q "^${PROJECT_NETWORK}$"; then
  docker network rm "$PROJECT_NETWORK"
  echo "Removed network: $PROJECT_NETWORK"
else
  echo "Network $PROJECT_NETWORK does not exist."
fi

docker-compose down -v --remove-orphans

echo "=== Project cleanup complete ==="