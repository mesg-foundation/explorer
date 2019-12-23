<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Headers</v-card-title>
      <v-list>
        <v-list-item v-for="meta in metas" :key="meta.key">
          <v-list-item-content>
            <v-list-item-title>{{ meta.key }}</v-list-item-title>
            <v-list-item-subtitle>{{ meta.value }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-title class="headline">Begin block events</v-card-title>
      <v-divider />
      <v-data-table
        :items="block.results.begin_block.events || []"
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
    </v-card>
    <v-card class="mt-2">
      <v-card-title class="headline">Transactions</v-card-title>
      <v-divider />
      <v-data-table
        :items="block.results.deliver_tx || []"
        :headers="headersTx"
      >
        <template v-slot:item.height="{ item }">
          {{ item }}
        </template>
        <template v-slot:item.events="{ value }">
          {{ value.length }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      blocks: 'blockchain/blocks'
    }),
    block() {
      return this.blocks[this.$route.params.height]
    },
    headersTx() {
      return [
        { text: 'Code', value: 'code' },
        { text: 'Gas wanted', value: 'gasWanted' },
        { text: 'Gas used', value: 'gasUsed' },
        { text: 'Events', value: 'events' }
      ]
    },
    headersEvent() {
      return [
        { text: 'Type', value: 'type' },
        { text: 'Attributes', value: 'attributes' }
      ]
    },
    metas() {
      return [
        { key: 'height', value: this.block.header.height },
        { key: 'chain id', value: this.block.header.chain_id },
        { key: 'time', value: this.block.header.time },
        { key: 'hash', value: this.block.hash },
        { key: 'transactions', value: this.block.header.num_txs },
        { key: 'total tx', value: this.block.header.total_txs },
        { key: 'validator', value: this.block.header.validators_hash },
        { key: 'app hash', value: this.block.header.app_hash }
      ]
    }
  },
  fetch: ({ store, params }) =>
    store.dispatch('blockchain/fetchBlock', params.height)
}
</script>
