<template>
  <v-container>
    <v-card v-if="tx">
      <v-card-title class="headline">Transaction</v-card-title>
      <v-list>
        <v-list-item v-for="meta in metas" :key="meta.key">
          <v-list-item-content>
            <v-list-item-title>{{ meta.key }}</v-list-item-title>
            <v-list-item-subtitle>{{ meta.value }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-title class="headline">Events</v-card-title>
      <v-divider />
      <v-data-table
        :items="tx.result.events || []"
        :headers="headersEvent"
        disable-filtering
        disable-pagination
        disable-sort
        hide-default-footer
      >
        <template v-slot:item.attributes="{ value }">
          {{ value }}
        </template>
      </v-data-table>
      <v-card-text>
        <code>{{ tx.tx }}</code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      txs: 'blockchain/txs'
    }),
    tx() {
      return this.txs[this.$route.params.hash]
    },
    headersEvent() {
      return [
        { text: 'Type', value: 'type' },
        { text: 'Attributes', value: 'attributes' }
      ]
    },
    metas() {
      return [
        { key: 'Hash', value: this.tx.hash },
        { key: 'Height', value: this.tx.height },
        { key: 'Index', value: this.tx.index },
        { key: 'Gas Wanted', value: this.tx.result.gas_wanted },
        { key: 'Gas Used', value: this.tx.result.gas_used },
        {
          key: 'Percent Gas Used',
          value: `${(this.tx.result.gas_used / this.tx.result.gas_wanted) *
            100}%`
        }
      ]
    }
  },
  fetch: ({ store, params }) =>
    store.dispatch('blockchain/fetchTx', decodeURIComponent(params.hash))
}
</script>
