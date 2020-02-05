import cosmosjs from '@cosmostation/cosmosjs'

export const COSMOS_LCD = 'http://localhost:1317'
export const CHAIN_ID = 'mesg-testnet-01'
export const HD_PATH = "m/44'/470'/0'/0/0"
export const BECH32_PREFIX = 'mesgtest'

export default () => {
  const cosmos = cosmosjs.network(COSMOS_LCD, CHAIN_ID)
  cosmos.setPath(HD_PATH)
  cosmos.setBech32MainPrefix(BECH32_PREFIX)
  return cosmos
}
