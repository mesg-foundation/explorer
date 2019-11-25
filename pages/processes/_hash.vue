<template>
  <div v-if="process">
    <Header>
      <h1 class="display-1">Process {{ process.key }}</h1>
    </Header>
    <v-divider />
    <v-container>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <v-card-text>
                <Graph
                  :nodes="nodes"
                  :edges="edges"
                  @nodeClicked="(x) => (selectedNode = x)"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="4">
            <v-card>
              <v-card-title>Selected node</v-card-title>
              <v-card-text>
                {{ selectedNode }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encode } from '@mesg/api/lib/util/base58'
import Header from '~/components/Header'
import Graph from '~/components/Graph'
export default {
  components: { Header, Graph },
  data() {
    return {
      selectedNode: null
    }
  },
  computed: {
    ...mapGetters({
      processes: 'processes/list'
    }),
    process() {
      return this.processes[this.$route.params.hash]
    },
    nodes() {
      return this.process.nodes.map((x) => ({
        ...(x.event || x.result || x.filter || x.map || x.task),
        type: Object.keys(x)[0]
      }))
    },
    edges() {
      return this.process.edges
    }
  },
  fetch: ({ store, params }) => store.dispatch('processes/get', params.hash),
  methods: {
    encode
  }
}
</script>
