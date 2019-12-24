<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      :href="item.href"
      :target="item.href ? '_blank' : null"
      nuxt
    >
      <v-list-item-avatar v-if="item.icon">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.key }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action v-if="item.to || item.href">
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
