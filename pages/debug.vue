<template>
  <v-container>
    <v-app-bar class="mb-4">
      <v-toolbar-title>Event debugger</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        :disabled="running"
        v-model="query"
        type="search"
        hide-details
        autofocus
        prepend-inner-icon="mdi-bug"
        placeholder="tm.event = 'Tx' AND message.module = 'execution'"
        solo
      />
      <v-spacer></v-spacer>
      <v-btn v-if="running" @click="stop" text
        ><v-icon>mdi-stop</v-icon>Stop</v-btn
      >
      <v-btn v-else @click="run" text><v-icon>mdi-play</v-icon>Start</v-btn>
    </v-app-bar>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(log, i) in logs" :key="i">
        <v-expansion-panel-header>{{
          log.date.toISOString()
        }}</v-expansion-panel-header>
        <v-divider />
        <v-expansion-panel-content>
          <v-card-text>
            <code>{{ log.output }}</code>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import RpcClient from 'tendermint/lib/rpc'
export default {
  data() {
    return {
      query: '',
      logs: [],
      client: null,
      running: false
    }
  },
  mounted() {
    this.client = new RpcClient('ws://localhost:26657')
  },
  methods: {
    async run() {
      this.logs = []
      await this.client.subscribe(
        { query: this.query },
        (event) =>
          (this.logs = [
            {
              date: new Date(),
              output: event
            },
            ...this.logs
          ])
      )
      this.running = true
    },
    stop() {
      this.running = false
      this.logs = []
      this.client.unsubscribeAll()
    }
  }
}
</script>

<style scoped>
code {
  width: 100%;
}
</style>
