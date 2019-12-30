<template>
  <v-system-bar v-bind="$attrs">
    <v-icon v-if="!nodeInfo" class="error--text">mdi-close</v-icon>
    <v-icon v-else>mdi-check</v-icon>
    <span>{{ nodeInfo.network }}</span>
    <v-spacer></v-spacer>
    <v-icon v-if="syncInfo.catching_up">mdi-sync</v-icon>
    <v-icon v-else>mdi-sync-off</v-icon>
    <v-icon>mdi-cube-send</v-icon>
    <span>{{ latestBlock }}</span>
  </v-system-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    nodeInfo: 'blockchain/nodeInfo',
    syncInfo: 'blockchain/syncInfo',
    latestBlock: 'blockchain/latestBlock'
  }),
  mounted() {
    this.$store.dispatch('blockchain/sync')
  }
}
</script>
