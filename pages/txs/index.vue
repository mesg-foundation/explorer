<template>
  <v-container>
    <v-card>
      <v-data-table :items="txs" :headers="headers">
        <template v-slot:item.events="{ item }">
          {{ item.result.events.length }}
        </template>
        <template v-slot:item.gasWanted="{ item }">
          {{ item.result.gas_wanted }}
        </template>
        <template v-slot:item.gasUsed="{ item }">
          {{ item.result.gas_used }}
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
      _txs: 'blockchain/txs'
    }),
    txs() {
      return Object.keys(this._txs)
        .sort((a, b) => b.localeCompare(a))
        .map((x) => this._txs[x])
    },
    headers() {
      return [
        { text: 'Height', value: 'height' },
        { text: 'Index', value: 'index' },
        { text: 'Tx', value: 'tx' },
        { text: 'Gas wanted', value: 'gasWanted' },
        { text: 'Gas used', value: 'gasUsed' },
        { text: 'Events', value: 'events' }
      ]
    }
  }
}
</script>
