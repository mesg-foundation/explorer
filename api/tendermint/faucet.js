import Cosmos, { CHAIN_ID } from './cosmos'

export default async (to, amount) => {
  const cosmos = Cosmos()
  const from = cosmos.getAddress(process.env.FAUCET_MNEMONIC)
  const account = (await cosmos.getAccounts(from)).result.value
  const stdMsg = cosmos.newStdMsg({
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
    chain_id: CHAIN_ID,
    account_number: account.account_number,
    sequence: account.sequence
  })
  const stdTx = cosmos.sign(
    stdMsg,
    cosmos.getECPairPriv(process.env.FAUCET_MNEMONIC)
  )
  return cosmos.broadcast(stdTx)
}
