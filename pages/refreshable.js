import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    endpoint: 'engine/getEndpoint'
  }),
  watch: {
    endpoint() {
      this.$options.fetch({
        store: this.$store,
        params: this.$route.params
      })
    }
  }
}
