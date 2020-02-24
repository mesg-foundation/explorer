<template>
  <div>
    <h2>Configuration</h2>
    <DependencyInfo :dependency="service.configuration" />
  </div>
</template>

<script>
import DependencyInfo from '~/components/service/DependencyInfo'
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
