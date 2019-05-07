<template>
  <div class="markdown-body" v-html="markdown"></div>
</template>

<script>
import * as Remarkable from 'remarkable'
import anchors from '~/plugins/remarkable-anchors'
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    markdown() {
      const md = new Remarkable('full', {
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      })
      md.use(anchors)
      return md.render(this.content)
    }
  }
}
</script>

<style lang="scss">
.markdown-body {
  font-size: 15px;

  p,
  ul li {
    font-weight: 400;
  }
}
</style>