<template>
  <nuxt-link :to="'services/' + sid">
    <section class="service-item">
      <ServiceLogo :url="logo" />
      <div class="prime">
        <div class="name">{{ name || sid }}</div>
        <div class="sid">{{ sid }}</div>
        <div class="description">{{ description }}</div>
      </div>
    </section>
  </nuxt-link>
</template>

<script>
import ServiceLogo from '~/components/ServiceLogo.vue'

export default {
  components: {
    ServiceLogo
  },

  props: ['name', 'sid', 'description', 'logo']
}
</script>

<style lang="scss" scoped>
.service-item {
  width: 100%;
  padding: 25px 30px;
  background-color: #fff;
  margin: 20px 0;
  box-shadow: 1px 2px 3px #eee;
  border-radius: 10px;
  display: flex;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 2px 6px 2px #e9e9e9;
  }

  .prime {
    .name {
      font-size: 15px;
      color: #333;
      font-weight: 600;
    }

    .sid {
      font-size: 13px;
      color: #999;
      margin-top: 8px;
    }

    .description {
      font-size: 13px;
      color: #444;
      margin-top: 12px;
      line-height: 20px;
    }
  }
}
</style>