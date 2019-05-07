<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>MESG Marketplace</span>
          <el-button style="float: right; padding: 3px 0" type="text">&times;</el-button>
        </div>
        <div>
          This beta version of the MESG Marketplace lets users buy and sell access to modular application components for a limited period of time.
          <br>
          <br>The Marketplace is fully decentralized as it runs on
          <a
            href="https://etherscan.io/address/0x0C6e8d0eC4770fDa8A56CD912392d2ff14822952"
            target="_blank"
          >Ethereum</a> with a
          <a
            href="https://github.com/mesg-foundation/marketplace"
            target="_blank"
          >custom smart contract</a> and uses the
          <a href="https://mesg.com/token/" target="_blank">MESG Token</a> for purchasing access to services. The source code of the services are also decentralized as they are published on
          <a
            href="https://ipfs.io/"
            target="_blank"
          >IPFS</a>.
          <br>
          <br>Check the full article about the
          <a
            href="https://medium.com/p/75c40cd70f4b"
            target="_blank"
          >release of the Marketplace on Medium</a>
        </div>
      </el-card>
    </div>
    <Services/>
  </div>
</template>

<script>
import Services from '~/components/Services'

export default {
  components: {
    Services
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 900px;
  margin: 20px auto 0 auto;
}
</style>
