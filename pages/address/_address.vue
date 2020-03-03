<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline">{{ address }}</v-card-title>
      <v-divider />
      <List :items="coins" />
      <v-divider />
      <List :items="meta" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-dialog>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark>Send</v-btn>
          </template>
          <v-card>
            <v-card-title>Transfer</v-card-title>
            <v-divider />
            <v-card-text>
              <v-text-field
                v-model="transfer.to"
                label="Receipient"
                required
              ></v-text-field>
              <v-layout>
                <v-flex xs8>
                  <v-text-field
                    v-model="transfer.amount"
                    label="Amount"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    v-model="transfer.denom"
                    :items="account.value.coins"
                    item-text="denom"
                    item-value="denom"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn @click="sendTransfer" color="primary">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import List from '~/components/List'
export default {
  components: {
    List
  },
  data() {
    return {
      transfer: {
        to: 'mesgtest1yztk7h0la9e2wdhed3h37sd50szq8hsvrvgump',
        denom: 'atto',
        amount: '10'
      }
    }
  },
  computed: {
    address() {
      return this.$route.params.address
    },
    coins() {
      return this.account.value.coins.map((x) => ({
        key: x.denom,
        value: x.amount
      }))
    },
    meta() {
      const accValue = this.account.value
      return [
        { key: 'Public key', value: accValue.public_key },
        { key: 'Account Number', value: accValue.account_number },
        { key: 'Sequence', value: accValue.sequence }
      ]
    }
  },
  async asyncData({ store, route }) {
    return {
      account: await store.dispatch('blockchain/account', {
        address: route.params.address
      })
    }
  },
  methods: {
    sendTransfer() {}
  }
}
</script>
