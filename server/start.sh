#!/bin/bash

docker build . -t mesg/marketplace-api:latest
docker-compose up -d