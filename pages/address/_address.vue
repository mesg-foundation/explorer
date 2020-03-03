<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline">{{ address }}</v-card-title>
      <v-divider />
      <List :items="coins" />
      <v-divider />
      <List :items="meta" />
    </v-card>
  </v-container>
</template>

<script>
import List from '~/components/List'
export default {
  components: {
    List
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
  }
}
</script>
