<template>
  <v-container fluid>
    <v-layout>
      <v-row>
        <v-col sm="8">
          <v-card>
            <v-card-title class="headline">{{ address }}</v-card-title>
            <v-divider />
            <List :items="meta" />
          </v-card>

          <v-card class="mt-4">
            <v-data-table
              :items="transactions.txs"
              :headers="headers"
              :items-per-page="parseInt(transactions.limit, 10)"
              :page="parseInt(transactions.page_number, 10)"
              :server-items-length="parseInt(transactions.total_count, 10)"
              :footer-props="{
                'items-per-page-options': [5, 10, 30, 50]
              }"
              @pagination="loadTx"
              disable-sort
            >
              <template v-slot:item.txhash="{ value }">
                <nuxt-link :to="`/txs/${value}`">{{ value }}</nuxt-link>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col sm="4">
          <v-card>
            <v-card-title class="headline">Balances</v-card-title>
            <v-divider />
            <List :items="coins" />
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
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
    },
    headers() {
      return [
        { text: 'Date', value: 'timestamp', sortable: false },
        { text: 'Hash', value: 'txhash', sortable: false },
        { text: 'Gas used', value: 'gas_used', sortable: false }
      ]
    }
  },
  async asyncData({ store, route }) {
    return {
      account: await store.dispatch('blockchain/account', {
        address: route.params.address
      }),
      transactions: await store.dispatch('blockchain/search', {
        'message.sender': route.params.address,
        page: route.query.page || 1,
        limit: route.query.limit || 30
      })
    }
  },
  methods: {
    async loadTx(pagination) {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          limit: pagination.itemsPerPage,
          page: pagination.page
        }
      })
      this.transactions = await this.$store.dispatch('blockchain/search', {
        'message.sender': this.address,
        limit: pagination.itemsPerPage,
        page: pagination.page
      })
    }
  }
}
</script>
