export default {
  // mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - MESG Explorer',
    title: 'MESG Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Explore and interact with the data present on the MESG Network'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/pluralize', '~/plugins/clipboard'],
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  env: {
    ENGINE_HOST: process.env.ENGINE_HOST || 'engine',
    FAUCET_MNEMONIC: process.env.FAUCET_MNEMONIC,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  googleAnalytics: {
    asyncID: ({ nuxtState }) => nuxtState.env.GA_ID
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    [
      'nuxt-env',
      {
        keys: [
          { key: 'HOST', default: 'http://localhost:3000' },
          { key: 'WS_HOST', default: 'ws://localhost:3002' },
          { key: 'GA_ID', default: '' }
        ]
      }
    ]
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#491E8C',
          accent: '#8350DB',
          secondary: '#388DF5',
          info: '#144DD1',
          warning: '#E08C04',
          error: '#9E2316',
          success: '#238218'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
