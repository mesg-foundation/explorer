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
  
  h1, h2, h3, h4, h5, h5 {
    font-weight: 300;
  }
}
</style>