<template>
  <ServiceList />
</template>

<script>
import ServiceList from '~/components/ServiceList.vue'

export default {
  components: {
    ServiceList
  },

  beforeCreate: function() {
    document.body.className = '';
  }
}
</script>
