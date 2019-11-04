#!/bin/bash

docker build . -t mesg/marketplace-api:latest
docker stack deploy marketplace-api --compose-file docker-compose.yml