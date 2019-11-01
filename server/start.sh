#!/bin/bash

EXT_PORT=3001
INT_PORT=3000
ENGINE_NETWORK=engine

mesg-cli daemon:start
docker service update --publish-rm 50052 --publish-rm 26656 engine
docker build . -t mesg/marketplace/proxy:latest
docker service create \
  --network $ENGINE_NETWORK \
  --publish $EXT_PORT:$INT_PORT \
  --env MESG_ENDPOINT=$ENGINE_NETWORK:50052 \
  --env PORT=$INT_PORT \
  --name marketplace-server \
  mesg/marketplace/proxy:latest