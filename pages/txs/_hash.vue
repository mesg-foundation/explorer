<template>
  <v-container fluid>
    <v-card v-if="tx">
      <v-card-title class="headline">Transaction</v-card-title>
      <List :items="metas" />
      <v-card-title class="headline">Events</v-card-title>
      <v-divider />
      <v-data-table
        :items="tx.result.events"
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
      <v-card-title class="headline">Raw transaction</v-card-title>
      <v-card-text>
        <code>{{ tx.tx }}</code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import pluralize from 'pluralize'
import Attribute from '~/components/Attribute'
import List from '~/components/List'
export default {
  components: { Attribute, List },
  head() {
    return {
      title: `Transaction #${this.$route.params.hash}`
    }
  },
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
        {
          key: 'Height',
          value: this.tx.height,
          to: `/blocks/${this.tx.height}`
        },
        this.resource
          ? {
              key: 'Resource',
              value: `${this.resource.name} - ${this.resource.hash}`,
              to: `/${pluralize(this.resource.name)}/${this.resource.hash}`
            }
          : null,
        { key: 'Index', value: this.tx.index },
        { key: 'Gas Wanted', value: this.tx.result.gas_wanted },
        { key: 'Gas Used', value: this.tx.result.gas_used },
        {
          key: 'Percent Gas Used',
          value: `${(
            (this.tx.result.gas_used / this.tx.result.gas_wanted) *
            100
          ).toFixed(2)}%`
        }
      ].filter((x) => !!x)
    },
    messages() {
      return this.tx.result.events
        .filter((x) => x.type === 'message')
        .reduce((prev, current) => [...prev, ...current.attributes], [])
    },
    resource() {
      const hash = (
        this.messages.find(
          (x) => x.key === Buffer.from('hash').toString('base64')
        ) || {}
      ).value
      const name = (
        this.messages.find(
          (x) => x.key === Buffer.from('module').toString('base64')
        ) || {}
      ).value
      return hash && name
        ? {
            hash: Buffer.from(hash, 'base64').toString(),
            name: Buffer.from(name, 'base64').toString()
          }
        : null
    }
  },
  fetch: ({ store, params }) =>
    store.dispatch('blockchain/fetchTx', decodeURIComponent(params.hash))
}
</script>

<style scoped>
code {
  width: 100%;
}
</style>
