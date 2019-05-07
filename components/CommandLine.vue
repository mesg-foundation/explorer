<template>
  <el-tooltip
    class="item"
    effect="light"
    content="copied!"
    placement="top-end"
    :manual="true"
    :value="copied"
  >
    <div class="command-container" v-on:click="copyDeploy">
      <code>{{ value }}</code>
      <font-awesome-icon class="icon" icon="copy" size="lg"/>
    </div>
  </el-tooltip>
</template>

<script>
import * as copy from 'copy-text-to-clipboard'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      copied: false
    }
  },
  methods: {
    copyDeploy() {
      copy(this.value)
      this.copied = true
      setTimeout(() => (this.copied = false), 600)
    }
  }
}
</script>

<style scoped>
.command-container {
  display: inline-block;
  background-color: #282c34;
  padding: .5rem .75rem;
  /* border-radius: 6px; */
  border: solid 1px gray;
  color: white;
}
code {
  margin-right: 0.5em;
}
</style>
