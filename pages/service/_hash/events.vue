<template>
  <div>
    <h2 class="headline mb-4">Events</h2>
    <v-expansion-panels accordion v-if="events.length">
      <v-expansion-panel v-for="event in events" :key="event.key">
        <v-expansion-panel-header>{{
          event.name || event.key
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ event.description }}</p>
          <h3 class="subtitle-1">Data</h3>
          <ParameterTable class="mb-6" :params="event.data || []" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>
      No events
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
  computed: {
    events() {
      return this.service.events
    }
  }
}
</script>
