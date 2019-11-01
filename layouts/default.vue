<template>
  <v-app light>
    <v-app-bar app dark color="primary">
      <nuxt-link to="/">
        <img
          class="mr-4"
          height="40"
          src="https://handbook.mesg.com/logo/MESG-logo-horizontal-white.svg"
        />
      </nuxt-link>
      <v-toolbar-title>
        Marketplace
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<style scoped>
span {
  color: white;
}
</style>
