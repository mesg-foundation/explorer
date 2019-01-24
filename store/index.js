export const state = () => ({
  search: '',
  services: [
    {
      name: 'Ethereum',
      sid: 'ethereum-erc20:v1',
      description: 'MESG Service to interact with an Ethereum ERC20 token',
      logo: 'https://ih0.redbubble.net/image.395362213.7630/flat,550x550,075,f.jpg'
    },
    {
      name: 'Webhook',
      sid: 'webhook:v2',
      description: 'Receive HTTP connections and emit events with the data'
    },
    {
      name: 'Mongodb',
      sid: 'mongodb',
      logo: 'https://img.icons8.com/color/1600/mongodb.png',
      description: 'The best MongoDB experience. Access data directly from your frontend code, intelligently distribute data for global apps, trigger serverless functions in response to data changes, and much more.'
    },
    {
      name: 'Discord',
      sid: 'discord:v2',
      logo: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png'
    }
  ]
})

export const mutations = {
  updateSearch (state, query) {
    state.search = query
  }
}
