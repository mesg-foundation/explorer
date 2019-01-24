export const state = () => ({
  search: '',
  services: [
    {
      name: "Etherum",
      sid: 'etherum-erc20:v1',
      description: 'MESG Service to interact with an Ethereum ERC20 token',
      logo: 'https://i.imgur.com/Nkj8hnb.png'
    },
    {
      name: "Webhook",
      sid: "webhook:v2",
      description: 'Receive HTTP connections and emit events with the data'
    },
    {
      name: "Discord",
      sid: "discord:v2",
      logo: 'https://d21buns5ku92am.cloudfront.net/67967/logo/retina-1530539712.png'
    }
  ]
})

export const mutations = {
  updateSearch (state, query) {
    state.search = query;
  }
}