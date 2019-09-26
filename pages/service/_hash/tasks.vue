<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="task in tasks" :key="task.key">
      <v-expansion-panel-header>{{
        task.name || task.key
      }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>{{ task.description }}</p>
        <h3 class="mb-4">Inputs</h3>
        <ParameterTable class="mb-6" :params="task.inputs || []" />
        <h3 class="mb-4">Outputs</h3>
        <ParameterTable :params="task.outputs || []" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ParameterTable from '~/components/ParameterTable'
export default {
  components: {
    ParameterTable
  },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    tasks() {
      return this.service.tasks
    }
  }
}
</script>
