<template>
  <v-container fluid>
    <v-card>
      <v-data-table :items="blocks" :headers="headers">
        <template v-slot:item.height="{ item }">
          <nuxt-link :to="`/blocks/${item.header.height}`">{{
            item.header.height
          }}</nuxt-link>
        </template>
        <template v-slot:item.txs="{ item }">
          {{ item.header.num_txs }}
        </template>
        <template v-slot:item.validator="{ item }">
          {{ item.header.validators_hash }}
        </template>
        <template v-slot:item.time="{ item }">
          {{ item.header.time }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: `Blocks`
    }
  },
  computed: {
    ...mapGetters({
      _blocks: 'blockchain/blocks'
    }),
    blocks() {
      return Object.keys(this._blocks)
        .sort((a, b) => b.localeCompare(a))
        .map((x) => this._blocks[x])
    },
    headers() {
      return [
        { text: 'Height', value: 'height' },
        { text: 'Txs', value: 'txs' },
        { text: 'Validator', value: 'validator' },
        { text: 'Time', value: 'time', align: 'right' }
      ]
    }
  }
}
</script>
