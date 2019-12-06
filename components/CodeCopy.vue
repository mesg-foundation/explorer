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
