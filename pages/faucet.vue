<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Token faucet</v-card-title>
      <v-divider />
      <v-card-text>
        <p>The faucet send 1000 MESG to a specific address.</p>
        <v-text-field
          v-model="address"
          label="MESG Address"
          prepend-icon="mdi-coin-outline"
          hint="Your address should look like `mesgtest1ndvn4s65rr8hzpx0737fz3l6h69sy0xnvl34tn`"
          required
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn @click="send" :loading="loading" color="primary">
          Send me test MESG Token
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      address: null,
      loading: false,
      result: null
    }
  },
  methods: {
    ...mapActions({
      faucet: 'blockchain/faucet'
    }),
    async send() {
      this.result = false
      this.loading = true
      this.result = await this.faucet(this.address)
      this.loading = false
    }
  }
}
</script>
