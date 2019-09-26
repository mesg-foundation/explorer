<template>
  <v-container>
    <nuxt-link
      v-for="service in services"
      :key="service.hash"
      :to="`/service/${service.hash}`"
      class="mb-4"
    >
      <v-card>
        <v-card-text>
          <h4 v-text="service.name" />
          <!-- <span class="caption">By {{author}}</span> -->
          <p v-text="service.description" />
          <v-chip label small class="mr-1">{{
            count(service.events, 'event')
          }}</v-chip>
          <v-chip label small class="mr-1">{{
            count(service.tasks, 'task')
          }}</v-chip>
        </v-card-text>
      </v-card>
    </nuxt-link>
  </v-container>
</template>

<script>
import pluralize from 'pluralize'
export default {
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  methods: {
    count(object, word) {
      return pluralize(word, Object.keys(object || {}).length, true)
    }
  }
}
</script>

<style scoped>
a {
  display: block;
  text-decoration: none;
}
</style>
