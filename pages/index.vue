<template>
  <section class="container">
    <TopBar />
    <div class="page-content">
      <ServiceList />
      <Footer />
    </div>
  </section>
</template>

<script>
import TopBar from '~/components/TopBar.vue'
import ServiceList from '~/components/ServiceList.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    TopBar,
    ServiceList,
    Footer
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #f5f5f5;
  font-family: 'Open Sans';
}

.container {
  width: 100%;
}

.page-content {
  padding: 20px;
  max-width: 900px;
  margin: 20px auto 0 auto;
}
</style>
