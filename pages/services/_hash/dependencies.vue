<template>
  <div>
    <h2>Dependencies</h2>
    <v-expansion-panels v-if="dependencies.length" multiple>
      <v-expansion-panel
        v-for="dependency in dependencies"
        :key="dependency.key"
      >
        <v-expansion-panel-header>{{
          dependency.name || dependency.key
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <DependencyInfo :dependency="dependency" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>
      No dependencies
    </div>
  </div>
</template>

<script>
import DependencyInfo from '~/components/service/DependencyInfo'
export default {
  components: {
    DependencyInfo
  },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  head() {
    return {
      title: `${this.service.name} - Dependencies`
    }
  },
  computed: {
    dependencies() {
      return this.service.dependencies || []
    }
  }
}
</script>
