<template>
  <div>
    <h2 class="headline mb-4">Configuration</h2>
    <DependencyInfo :dependency="service.configuration" />
  </div>
</template>

<script>
import DependencyInfo from '~/components/DependencyInfo'
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
      title: `${this.service.name} - Configuration`
    }
  }
}
</script>
