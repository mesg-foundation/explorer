<template>
  <section class="topbar">
    <div class="content">
      <div class="logo" title="MESG Foundation" alt="MESG Fountation"></div>
      <el-input class="search" @input="updateSearch" placeholder="Search services"></el-input>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    updateSearch(query) {
      this.$store.commit('updateSearch', query.trim());
    }
  }
}
</script>

<style lang="scss" scoped>
$logo-size: 50px;

.topbar {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #510f91;
  padding: 7px 40px;

  .content {
    width: 100%;
    display: flex;
  }

  .logo {
    background: url('../static/logo_white_t.png');
    background-size: $logo-size;
    width: $logo-size;
    height: $logo-size;
  }

  .search {
    width: 300px;
    margin-left: auto;
    margin-top: 4px;
    height: 40px;
  }
}
</style>

<style lang="scss">
.topbar {
  .search input {
    border: 0;
    background-color: #3d0065;
    color: #fff;
    transition: all 0.2s ease;
    
    &:focus {
      background-color: #fbf5ff;
      color: #111;
    }
  }
}
</style>