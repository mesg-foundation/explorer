const cosmosjs = require('@cosmostation/cosmosjs')
const chainId = 'mesg-testnet-01'
const cosmos = cosmosjs.network('http://localhost:1317', chainId)
cosmos.setPath("m/44'/470'/0'/0/0")
cosmos.setBech32MainPrefix('mesgtest')
const mnemonic = 'TODO'
const address = cosmos.getAddress(mnemonic)
const ecpairPriv = cosmos.getECPairPriv(mnemonic)

const createTransfer = async (from, to, amount) => {
  const account = (await cosmos.getAccounts(from)).result.value
  return cosmos.newStdMsg({
    msgs: [
      {
        type: 'cosmos-sdk/MsgSend',
        value: {
          amount: [
            {
              amount: amount.toString(),
              denom: 'atto'
            }
          ],
          from_address: from,
          to_address: to
        }
      }
    ],
    fee: { amount: [{ amount: '200000', denom: 'atto' }], gas: '200000' },
    memo: '',
    chain_id: chainId,
    account_number: account.account_number,
    sequence: account.sequence
  })
}

export default async (to, amount) => {
  const stdMsg = await createTransfer(address, to, amount)
  const stdTx = cosmos.sign(stdMsg, ecpairPriv)
  const tx = await cosmos.broadcast(stdTx)
  return tx
}
