<template>
  <div>env {{ service }}</div>
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
