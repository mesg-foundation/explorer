# MESG Explorer

Explorer to interact with the MESG Engine.

To run it, you need to have your MESG Engine running that you can run with `mesg-cli daemon:start` then start the explorer with the following command:

```bash
docker service create --network engine -p 3000:3000 -p 3002:3002 mesg/explorer
```

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ ENGINE_HOST=localhost npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
