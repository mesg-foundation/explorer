<template>
  <v-container fluid>
    <nuxt-link
      v-for="service in services"
      :key="service.hash"
      :to="`/services/${service.hash}`"
      class="mb-4"
    >
      <v-card>
        <v-card-text>
          <h3 v-text="service.name" class="service-name" />
          <p v-text="service.description" />
          <v-chip label small class="mr-1">{{
            'task' | pluralize((service.tasks || []).length, true)
          }}</v-chip>
          <v-chip label small class="mr-1">{{
            'event' | pluralize((service.events || []).length, true)
          }}</v-chip>
        </v-card-text>
      </v-card>
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true
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
