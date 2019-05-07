<template>
  <nuxt-link :to="'services/' + definition.sid">
    <section class="service-item">
      <div class="prime">
        <div class="name">{{ definition.name || definition.sid }}</div>
        <div class="sid">{{ definition.sid }}</div>
        <div class="description">{{ definition.description }}</div>
      </div>
      <div class="price">
        <span v-if="baseOffer">From {{baseOffer.price}} MESG</span>
        <span v-else>Free service</span>
      </div>
    </section>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      versionsByHash: 'versionsByHash'
    }),
    definition() {
      const version = this.versionsByHash[this.service.latestVersion]
      return version.manifestData.service.definition
    },
    baseOffer() {
      return this.service.offers[0]
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