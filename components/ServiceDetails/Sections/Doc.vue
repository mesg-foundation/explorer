<template>
  <div class="markdown-body" v-html="content"></div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.markdown-body {
  font-size: 15px;

  p, ul li {
    font-weight: 400;
  }
}
</style>