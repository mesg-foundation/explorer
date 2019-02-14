<template>
  <section class="container">
    <TopBar class="flex-shrink" />
    <nuxt class="flex-shrink flex-grow" />
    <Footer class="flex-shrink" />
  </section>
</template>

<script>
import TopBar from '~/components/TopBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    TopBar,
    Footer
  },

  mounted() {
    this.$store.dispatch('fetchServices');
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #f8f8f8;
  font-family: 'Open Sans';
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  word-spacing: 1px;
  box-sizing: border-box;
}

body.light {
  background-color: #fff;
}

a {
  text-decoration: none;
}

.container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .flex-grow {
    flex-grow: 1;
  }

  .flex-shrink {
    flex-shrink: 0;
  }
}
</style>