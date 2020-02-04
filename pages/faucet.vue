<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Token faucet</v-card-title>
      <v-divider />
      <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="step > 1" :step="1" editable
          >Add your MESG Address</v-stepper-step
        >
        <v-stepper-content :step="1">
          <v-text-field v-model="address" label="MESG Address" required />
          <v-btn @click="step++" color="primary">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" :step="2" editable
          >Publish on social network</v-stepper-step
        >
        <v-stepper-content :step="2">
          <v-layout>
            <v-btn
              :href="tweetLink"
              dark
              x-large
              color="rgb(29,161,242)"
              target="_blank"
              class="mr-2"
              >Tweet</v-btn
            >
            <p>
              Publish a tweet with your MESG address and copy the url of the
              post.
              <br />
              <em>
                (note: make sure that your post is public in order for our robot
                to find it)
              </em>
            </p>
          </v-layout>
          <v-btn @click="step++" color="primary">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" :step="3" editable
          >Request tokens</v-stepper-step
        >
        <v-stepper-content :step="3">
          <p>
            Add the link of your post in the following form and just click
            "continue".
          </p>
          <v-text-field v-model="url" label="Post URL" required />
          <v-btn @click="send" :loading="loading" color="primary"
            >Continue</v-btn
          >
        </v-stepper-content>

        <v-stepper-step :complete="step > 4" :step="4" editable
          >Get started with MESG</v-stepper-step
        >
        <v-stepper-content :step="4">
          <v-alert v-if="result" type="success">
            Your transaction has been processed.
            <v-spacer />
            <nuxt-link :to="`/txs/${result.txhash}`"
              >See my transaction</nuxt-link
            >
          </v-alert>
          <p>
            Now that you have your address with some tokens you can start to use
            MESG on the test network
          </p>
          <a href="https://docs.mesg.com" target="_blank"
            >Learn how to use MESG</a
          >
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      step: 1,
      address: null,
      url: null,
      loading: false,
      result: null
    }
  },
  computed: {
    text() {
      return `Requesting faucet funds into ${this.address} on the #MESG #testnet`
    },
    tweetLink() {
      const params = [
        `text=${encodeURIComponent(this.text)}`,
        `url=${encodeURIComponent(this.$env.HOST)}`,
        `via=mesgfoundation`
      ].join('&')
      return `https://twitter.com/intent/tweet?${params}`
    }
  },
  methods: {
    ...mapActions({
      faucet: 'blockchain/faucet'
    }),
    async send() {
      this.result = null
      this.loading = true
      this.result = await this.faucet({
        url: this.url,
        address: this.address
      })
      this.step++
      this.loading = false
    }
  }
}
</script>
