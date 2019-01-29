<template>
  <section class="topbar">
    <div class="content">
      <nuxt-link to="/">
        <div @click="clearSearch" class="logo" title="MESG Foundation" alt="MESG Fountation"></div>
      </nuxt-link>
      <el-input class="search" :value="search" @input="updateSearch" placeholder="Search services"></el-input>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'search'
  ]),

  methods: {
    updateSearch(query) {
      this.$router.push('/')
      this.$store.commit('updateSearch', query.trim());
    },

    clearSearch() {
      this.$store.commit('updateSearch');
    }
  }
}
</script>

<style lang="scss" scoped>
$logo-size: 50px;

.topbar {
  width: 100%;
  background-color: #510f91;
  padding: 7px 40px;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    background: url('../static/logo_white_t.png');
    background-size: $logo-size;
    width: $logo-size;
    height: $logo-size;
    vertical-align: center;
    margin-right: 15px;
  }

  .search {
    width: 300px;
    margin-left: auto;
    margin-top: -2px;
    height: 40px;
  }
}

@media screen and (max-width: 900px) {
  .topbar {
    padding: 7px 15px;
  }
}
</style>

<style lang="scss">
.topbar {
  .search input {
    border: 0;
    background-color: #3d0065;
    color: #fff;
    border-radius: 25px;
    transition: all 0.2s ease;

    
    &:focus {
      background-color: #fbf5ff;
      color: #111;
    }
  }
}
</style>