const crypto = require('crypto')
const bip39 = require('bip39')
const bip32 = require('bip32')
const bech32 = require('bech32')
const secp256k1 = require('secp256k1')
const CryptoJS = require('crypto-js')
const fetch = require('node-fetch')
const { marshalTx } = require('@tendermint/amino-js')

const DEFAULT_HD_PATH = "m/44'/470'/0'/0/0"
const DEFAULT_BECH_PREFIX = 'mesgtest'

const MNEMONIC = '__MNEMONIC__'
const TO = '__ADDRESS__'

const accountFromSeed = (
  mnemonic,
  bech32Prefix = DEFAULT_BECH_PREFIX,
  hdPath = DEFAULT_HD_PATH
) => {
  if (!bip39.validateMnemonic(mnemonic)) throw new Error('invalid mnemonic')

  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const masterKey = bip32.fromSeed(seed)
  const cosmosHD = masterKey.derivePath(hdPath)
  const privateKey = cosmosHD.privateKey
  const publicKey = Buffer.from(
    secp256k1.publicKeyCreate(privateKey, true),
    'hex'
  )
  const message = CryptoJS.enc.Hex.parse(publicKey.toString('hex'))
  const address = CryptoJS.RIPEMD160(CryptoJS.SHA256(message)).toString()
  const words = bech32.toWords(Buffer.from(address, 'hex'))
  const cosmosAddress = bech32.encode(bech32Prefix, words)
  return {
    cosmosAddress,
    publicKey,
    privateKey
  }
}

function deterministicObj(obj) {
  if (Array.isArray(obj)) return obj.map(deterministicObj)
  if (typeof obj !== `object`) return obj
  const empty = (x) => x === undefined || x === null
  return Object.keys(obj)
    .sort()
    .reduce(
      (prev, current) =>
        empty(obj[current])
          ? prev
          : {
              ...prev,
              [current]: deterministicObj(obj[current])
            },
      {}
    )
}

function getPubKeyBase64(ecpairPriv) {
  const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv)
  return Buffer.from(pubKeyByte, 'binary').toString('base64')
}

async function main() {
  const account = accountFromSeed(MNEMONIC)
  const signMessage = {
    msgs: [
      {
        type: `cosmos-sdk/MsgSend`,
        value: {
          fromAddress: account.cosmosAddress,
          toAddress: TO,
          amounts: [{ denom: 'atto', amount: '1000' }]
        }
      }
    ],
    fee: { amount: [{ denom: 'atto', amount: '1' }], gas: '21906' },
    signatures: [],
    memo: '1',
    sequence: 100,
    account_number: 0,
    chain_id: 'mesg-testnet-01'
  }
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(deterministicObj(signMessage)))
    .digest('hex')
  const buf = Buffer.from(hash, 'hex')
  const signObj = secp256k1.ecdsaSign(buf, account.privateKey)
  const signatureBase64 = Buffer.from(signObj.signature, 'binary').toString(
    'base64'
  )
  const signedTx = {
    type: 'auth/StdTx',
    value: {
      msg: signMessage.msgs,
      fee: signMessage.fee,
      memo: signMessage.memo,
      signatures: [
        {
          signature: signatureBase64,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: getPubKeyBase64(account.privateKey)
          }
        }
      ]
    }
  }
  console.log(JSON.stringify(signedTx))

  const tx = deterministicObj(signedTx)
  const encodedTx = '0x' + Buffer.from(marshalTx(tx), 'binary').toString('hex')
  console.log(encodedTx)
  const res = await fetch(
    `http://localhost:26657/broadcast_tx_sync?tx=${encodedTx}`
  )
  console.log(await res.json())
}

main()
