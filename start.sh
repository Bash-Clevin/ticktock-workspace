#!/bin/sh
export UID=$(id -u)
export GID=$(id -g)
export DOCKER_USER=$(whoami)

docker compose up --build