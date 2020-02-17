<template>
  <v-chip small class="mr-2" label outlined>{{ key }} = {{ value }}</v-chip>
</template>

<script>
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
    }
  },
  methods: {
    decode(str) {
      return Buffer.from(str || '', 'base64').toString() || 'null'
    }
  }
}
</script>
