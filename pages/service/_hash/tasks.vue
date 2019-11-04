<template>
  <div>
    <h2 class="headline mb-4">Tasks</h2>
    <v-expansion-panels v-if="tasks.length" multiple>
      <v-expansion-panel v-for="task in tasks" :key="task.key">
        <v-expansion-panel-header>{{
          task.name || task.key
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ task.description }}</p>
          <h3 class="subtitle-1">Inputs</h3>
          <ParameterTable class="mb-6" :params="task.inputs || []" />
          <h3 class="subtitle-1">Outputs</h3>
          <ParameterTable :params="task.outputs || []" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>
      No tasks
    </div>
  </div>
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
  head() {
    return {
      title: `${this.service.name} - Tasks`
    }
  },
  computed: {
    tasks() {
      return this.service.tasks
    }
  }
}
</script>
