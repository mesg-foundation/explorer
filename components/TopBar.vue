<template>
  <section class="topbar">
    <div class="content">
      <nuxt-link to="/">
        <div @click="clearSearch" class="logo" title="MESG Foundation" alt="MESG Fountation"></div>
      </nuxt-link>
      <el-input class="search" :value="search" @input="updateSearch" placeholder="search services..."></el-input>
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
.topbar {
  width: 100%;
  background-color: #510f91;
  border-bottom: 1px solid #eee;
  padding: 15px 40px;
  transition: all 0.2s ease;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    background-image: url('../static/logo_white_t_text.png');
    background-repeat: no-repeat;
    background-size: 140px;
    width: 140px;
    height: 40px;
    vertical-align: center;
    margin-right: 15px;
  }

  .search {
    width: 300px;
    margin-left: auto;
    margin-top: -2px;
    height: 40px;
    color: #510f91;
  }
}

body.light {
  .topbar {
    background-color: #fff;
  }

  .logo {
    background-image: url('../static/logo_purple_t.png');
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
    color: #fff;
    background-color: #3d0065;
    border-radius: 25px;
    transition: all 0.2s ease;

    
    &:focus {
      background-color: #fbf5ff;
      color: #111;

      &::placeholder {
        color: #555;
      }
    }

    &::placeholder {
      color: #ddd;
    }
  }
}

body.light {
  .topbar {
    .search input {
      background-color: #fbf5ff;
      color: #7609e0;
      
      &:focus {
        background-color: #fefdff;
        color: #111;
      }

      &::placeholder {
        color: #510f91;
      }
    }
  }
}
</style>