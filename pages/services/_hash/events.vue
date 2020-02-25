<template>
  <div>
    <h2>Events</h2>
    <v-expansion-panels v-if="events.length" multiple>
      <v-expansion-panel v-for="event in events" :key="event.key">
        <v-expansion-panel-header>{{ event.key }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ event.description }}</p>
          <h3 class="subtitle-1">Data</h3>
          <ParameterTable :params="event.data || []" class="mb-6" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>No events</div>
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
      title: `${this.service.name} - Events`
    }
  },
  computed: {
    events() {
      return this.service.events || []
    }
  }
}
</script>
