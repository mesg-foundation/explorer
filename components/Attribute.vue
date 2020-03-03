<template>
  <v-chip :to="to" small class="mr-2" label outlined nuxt
    >{{ key }} = {{ value }}</v-chip
  >
</template>

<script>
import { BECH32_PREFIX } from '~/api/tendermint/cosmos'
export default {
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  computed: {
    key() {
      return this.decode(this.attribute.key)
    },
    value() {
      return this.decode(this.attribute.value)
    },
    to() {
      const addressRegexp = new RegExp(`^${BECH32_PREFIX}[a-z0-9]*$`)
      if (this.value.match(addressRegexp)) {
        return `/address/${this.value}`
      }
      return null
    }
  },
  methods: {
    decode(str) {
      return Buffer.from(str || '', 'base64').toString() || 'null'
    }
  }
}
</script>
