<template>
  <v-app light>
    <v-app-bar app dark>
      <v-toolbar-title>
        <nuxt-link to="/">
          <img
            class="mt-1"
            height="50px"
            src="https://handbook.mesg.com/logo/MESG-logo-horizontal-white.svg"
          />
        </nuxt-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-select
        style="max-width: 150px;"
        :items="endpoints"
        :value="endpoint"
        solo
        hide-details
        single-line
        flat
        @change="updateEndpoint"
      ></v-select>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      network: 'localhost'
    }
  },
  computed: {
    ...mapGetters({
      endpoint: 'engine/getEndpoint'
    }),
    endpoints() {
      return [
        {
          text: 'localhost',
          value: 'http://localhost:3001'
        }
      ]
    }
  },
  methods: mapActions({
    updateEndpoint: 'engine/updateEndpoint'
  })
}
</script>
