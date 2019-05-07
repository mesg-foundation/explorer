<template>
  <nuxt-link :to="'services/' + version.sid">
    <section class="service-item">
      <div class="prime">
        <div class="name">{{ version.name || version.sid }}</div>
        <div class="sid">{{ version.sid }}</div>
        <div class="description">{{ version.description }}</div>
      </div>
      <div class="price">
        <span v-if="offer">From {{offer.price}} MESG</span>
        <span v-else>Free service</span>
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

  props: {
    service: {
      type: Object,
      required: true
    }
  },

  computed: {
    version() {
      return [...this.service.versions].sort(
        (a, b) => new Date(b.createTime) - new Date(a.createTime)
      )[0].manifestData.service.definition
    },
    offer() {
      return [...this.service.offers]
        .filter(x => x.active)
        .sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10))[0]
    }
  }
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
    flex: 2;
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
  .price {
    flex: 1;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    text-align: right;
  }
}
</style>