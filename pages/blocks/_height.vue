<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline">Headers</v-card-title>
      <List :items="metas" />
      <v-card-title class="headline">Begin block events</v-card-title>
      <v-divider />
      <v-data-table
        :items="block.result_begin_block.events || []"
        :headers="headersEvent"
        disable-filtering
        disable-pagination
        disable-sort
        hide-default-footer
      >
        <template v-slot:item.attributes="{ value }">
          <Attribute v-for="(attr, i) in value" :key="i" :attribute="attr" />
        </template>
      </v-data-table>
    </v-card>
    <v-card class="mt-2">
      <v-card-title class="headline">Transactions</v-card-title>
      <v-divider />
      <v-data-table :items="block.txs_results || []" :headers="headersTx">
        <template v-slot:item.events="{ value }">{{ value.length }}</template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Attribute from '~/components/Attribute'
import List from '~/components/List'
export default {
  components: {
    Attribute,
    List
  },
  head() {
    return {
      title: `Block #${this.$route.params.height}`
    }
  },
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
        { key: 'transactions', value: (this.block.data.txs || []).length },
        { key: 'validator', value: this.block.header.validators_hash },
        { key: 'app hash', value: this.block.header.app_hash }
      ]
    }
  },
  fetch: ({ store, params }) =>
    store.dispatch('blockchain/fetchBlock', params.height)
}
</script>
