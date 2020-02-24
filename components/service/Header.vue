<template>
  <div>
    <Header>
      <h1 v-text="service.name" class="headline-service-name" />
      <!-- <span class="caption">By {{author}}</span> -->
      <p v-text="service.description" />
      <v-chip label small class="mr-1">{{
        'task' | pluralize((service.tasks || []).length, true)
      }}</v-chip>
      <v-chip label small class="mr-1">{{
        'event' | pluralize((service.events || []).length, true)
      }}</v-chip>
    </Header>
    <div style="background-color:white;">
      <v-container fluid class="pa-0">
        <v-tabs class="mt-0">
          <v-tab :to="`/services/${service.hash}`" nuxt exact>Readme</v-tab>
          <v-tab :to="`/services/${service.hash}/tasks`" nuxt exact
            >Tasks</v-tab
          >
          <v-tab :to="`/services/${service.hash}/events`" nuxt exact
            >Events</v-tab
          >
          <v-tab :to="`/services/${service.hash}/dependencies`" nuxt exact
            >Dependencies</v-tab
          >
          <v-tab :to="`/services/${service.hash}/configuration`" nuxt exact
            >Configuration</v-tab
          >
        </v-tabs>
      </v-container>
    </div>
  </div>
</template>

<script>
import Header from '../Header'
export default {
  components: { Header },
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>
