<template>
  <Services />
</template>

<script>
import Services from '~/components/Services'

export default {
  components: {
    Services
  },

  beforeCreate: function() {
    document.body.className = '';
  }
}
</script>
