<template>
  <header class="pt-5">
    <v-container class="pb-0">
      <h1 v-text="service.name" />
      <!-- <span class="caption">By {{author}}</span> -->
      <p v-text="service.description" />
      <v-chip label small class="mr-1">{{
        'task' | pluralize(service.tasks.length, true)
      }}</v-chip>
      <v-chip label small class="mr-1">{{
        'event' | pluralize(service.events.length, true)
      }}</v-chip>
      <v-tabs class="mt-4">
        <v-tab nuxt :to="`/service/${service.hash}/tasks`">Tasks</v-tab>
        <v-tab nuxt :to="`/service/${service.hash}/events`">Events</v-tab>
        <v-tab nuxt :to="`/service/${service.hash}/dependencies`"
          >Dependencies</v-tab
        >
        <v-tab nuxt :to="`/service/${service.hash}/environment`"
          >Environment</v-tab
        >
      </v-tabs>
    </v-container>
  </header>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
header {
  background: white;
}
</style>
