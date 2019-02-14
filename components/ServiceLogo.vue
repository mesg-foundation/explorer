<template>
  <div v-if="url" class="logo" :style="{ width: sizePX }">
    <img :src="url" :style="{ height: sizePX }" />
  </div>
</template>

<script>
export default {
  computed: {
    sizePX(){
      return this.size + 'px'
    }
  },

  props: {
    url: String,
    size: {
      type: Number,
      default: 60
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-right: 20px;

  img {
    width: auto;
    border-radius: 6px;
  }
}
</style>