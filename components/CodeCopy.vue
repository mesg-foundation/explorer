<template>
  <div>
    <v-text-field
      :value="code"
      @click:append="copy"
      solo
      append-icon="mdi-content-copy"
      readonly
      hide-details
      flat
      dark
    ></v-text-field>
    <v-snackbar v-model="done" :timeout="2000">
      Code copied
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      done: false
    }
  },
  methods: {
    async copy() {
      this.done = false
      await this.$copyText(this.code)
      this.done = true
    }
  }
}
</script>

<style lang="scss">
.code-copy {
  border-radius: 6px;
  .v-input__slot {
    background-color: #2e3148 !important;
    color: hsla(0, 0%, 100%, 0.8) !important;
  }
}
</style>
