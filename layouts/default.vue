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
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
