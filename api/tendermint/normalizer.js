import { getBlockHash, tmhash } from 'tendermint/lib/hash'

const decode = (str) => Buffer.from(str || '', 'base64').toString()

const txHash = (tx) =>
  tmhash(Buffer.from(tx.tx, 'base64'))
    .toString('hex')
    .toUpperCase()

const events = (events) =>
  (events || []).map((event) => ({
    type: event.type,
    attributes: event.attributes.map((attribute) => ({
      key: decode(attribute.key),
      value: decode(attribute.value)
    }))
  }))

const block = (block) => {
  const results = { ...block.results }
  if (results.begin_block) {
    results.begin_block.events = events(results.begin_block.events)
  }
  return {
    ...block,
    hash: getBlockHash(block.header),
    results
  }
}

const tx = (tx) => {
  const result = { ...tx.result, ...tx.tx_result } // result are not the same if it comes from an event or a fetch
  return {
    hash: tx.hash || txHash(tx),
    height: tx.height,
    index: tx.index,
    tx: Buffer.from(tx.tx, 'base64').toString(),
    result: {
      data: result.data,
      log: result.log,
      gasWanted: result.gasWanted || result.gas_wanted,
      gasUsed: result.gasUsed || result.gas_used,
      events: events(result.events)
    }
  }
}

export default {
  block,
  tx,
  events
}
