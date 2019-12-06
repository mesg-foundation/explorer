# Dashboard

Dashboard to interact with the MESG Engine.

To run it, you need to have your MESG Engine running that you can run with `mesg-cli daemon:start` then start the dashboard with the following command:

```bash
docker service create --network engine -p 5000:5000 --env ENGINE_ENDPOINT=engine:50052 mesg/dashboard
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
