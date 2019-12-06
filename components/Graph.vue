<template>
  <div></div>
</template>

<script>
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'

export default {
  props: {
    nodes: {
      type: Array,
      required: true
    },
    edges: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    nodes() {
      this.refreshGraph()
    },
    edges() {
      this.refreshGraph()
    }
  },
  mounted() {
    this.refreshGraph()
  },
  methods: {
    refreshGraph() {
      const component = this
      cytoscape.use(dagre)
      cytoscape({
        container: this.$el,
        layout: {
          name: 'dagre'
        },
        style: cytoscape
          .stylesheet()
          .selector('node')
          .css({
            content: 'data(id)'
          })
          .selector('edge')
          .css({
            'target-arrow-shape': 'triangle-backcurve',
            'curve-style': 'bezier'
          }),
        elements: [
          ...this.nodes.map((x) => ({
            group: 'nodes',
            data: {
              ...x,
              label: x.key,
              id: x.key
            },
            classes: 'center-left'
          })),
          ...this.edges.map((x) => ({
            group: 'edges',
            data: {
              ...x,
              id: [x.src, x.dst].join('-'),
              label: [x.src, x.dst].join('-'),
              source: x.src,
              target: x.dst
            },
            classes: 'center-left'
          }))
        ]
      })
        .on('tap', 'node', function() {
          component.$emit(
            'nodeClicked',
            component.nodes.find((x) => x.key === this.data('id'))
          )
        })
        .on('tap', 'edge', function() {
          component.$emit(
            'edgeClicked',
            component.edges.find(
              (x) =>
                x.src === this.data('source') && x.dst === this.data('target')
            )
          )
        })
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
