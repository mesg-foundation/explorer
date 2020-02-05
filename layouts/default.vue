<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-list-item v-if="item.to" :key="i" :to="item.to" link>
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            :key="i"
            v-if="item.children"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(subItem, j) in item.children"
              :key="j"
              :to="subItem.to"
              link
            >
              <v-list-item-action v-if="subItem.icon">
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <template v-slot:append>
        <StatusBar />
      </template>
    </v-navigation-drawer>
    <v-app-bar app dark color="primary" clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/">
          <img
            class="mr-4"
            height="40"
            src="https://handbook.mesg.com/logo/MESG-logo-horizontal-white.svg"
          />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://mesg.com" text primary>
        mesg.com
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import StatusBar from '~/components/StatusBar'
export default {
  components: { StatusBar },
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    items() {
      return [
        { icon: 'mdi-code-tags-check', title: 'Services', to: '/services' },
        { icon: 'mdi-sitemap', title: 'Processes', to: '/processes' },
        {
          icon: 'mdi-cog-clockwise',
          title: 'Executions',
          to: '/executions'
        },
        { icon: 'mdi-cube-send', title: 'Blocks', to: '/blocks' },
        { icon: 'mdi-function-variant', title: 'Transactions', to: '/txs' },
        {
          icon: 'mdi-tools',
          title: 'Tools',
          children: [
            { icon: 'mdi-bug', title: 'Debug', to: '/debug' },
            { icon: 'mdi-gift', title: 'Faucet', to: '/faucet' }
          ]
        }
      ]
    }
  }
}
</script>
