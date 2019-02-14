<template>
  <span
    :class="{ uppercase }"
    :style="{ backgroundColor: background, color: color }">{{ name }}</span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    background: String, 
    color: String,
    uppercase: Boolean
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
  color: #111;
  background-color: #eee;
  padding: 2px 9px;
  border-radius: 25px;
  margin-right: 5px;

  &.uppercase {
    text-transform: uppercase;
  }
}
</style>