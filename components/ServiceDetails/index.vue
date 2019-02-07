<template>
  <section class="container">
    <div class="service-detail">
      <Info 
        :name="name"
        :logo="logo"
        :currentHash="versionRoute"
        :sid="sid"
        :usid="usid"
        :description="description" />
      <div class="content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-tabs class="main" v-model="activeDescription" @tab-click="handleTabClick">
              <el-tab-pane label="DOC" name="doc">
                <Doc
                  class="tab-container"
                  :content="doc" />
              </el-tab-pane>
              <el-tab-pane label="API" name="api">
                <API
                  class="tab-container"
                  :events="events"
                  :tasks="tasks" />
              </el-tab-pane>
              <el-tab-pane label="VARIABLES" name="variables">
                <Variables
                  class="tab-container"
                  :variables="variables" />
              </el-tab-pane>
              <el-tab-pane label="HASHES" name="hashes">
                <Hashes
                  class="tab-container"
                  :usid="usid"
                  :versions="versions" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
            <Box :items="detail" />
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import * as Remarkable from 'remarkable'
import * as scrollTo from 'scroll-to-element'
import Box from './Box.vue'
import Info from './Sections/Info'
import Doc from './Sections/Doc'
import API from './Sections/API'
import Variables from './Sections/Variables'
import Hashes from './Sections/Hashes'

export default {
  components: {
    Box,
    Info,
    Doc,
    API,
    Variables,
    Hashes
  },

  data() {
    return {
      activeDescription: 'doc'
    }
  },

  computed: {
    doc() {
      return (new Remarkable('full', {
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      })).render(this.readme);
    },

    yaml() {
      return YAML.stringify(json)
    },

    detail() {
      return [{
        name: 'author',
        text: this.author
      }, {
        name: 'sid',
        text: this.sid
      }, {
        name: 'latest hash',
        text: this.lastShortVersion,
        link: '/services/'+ this.usid +'/'+ this.lastVersion +'#hashes'
      }]
    },

    lastVersion() {
      return this.versions[0].hash
    },

    lastShortVersion() {
      return this.shortenHash(this.lastVersion)
    },

    versionRoute() {
      const version = this.$route.params.hash
      if (!version) return ""
      return this.shortenHash(version)
    },

    author() {
      return this.owner.substring(0,17)
    }
  },

  watch: {
    '$route.hash': function(){
      this.navigateToHashRoute()
    }
  },

  mounted() {
    Vue.nextTick(() => this.navigateToHashRoute())
  },

  methods: {
    navigateToHashRoute() {
      const route = this.$route.hash.split('#')[1];
      if (!route) return
      scrollTo(`#tab-${route}`)
      this.activeDescription = route
    },

    handleTabClick() {
      this.$router.push(`#${this.activeDescription}`)
    },

    copyDeploy() {
      copy(`mesg-core service deploy ${this.sid}`)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 600)
    },

    shortenHash(hash) {
      return hash.substring(0,9)
    }
  },

  props: [
    'name',
    'sid',
    'usid',
    'description',
    'logo',
    'readme',
    'versions',
    'variables',
    'events',
    'tasks',
    'owner',
  ]
}
</script>

<style lang="scss" scoped>
.service-detail {
  .content {
    .main {
      margin-right: 30px;

      .tab-container {
        color: #222;
        background-color: #fff;
        font-family: 'Open Sans';
        font-weight: 300;
        padding: 40px;
        margin: 20px 0 20px 40px;
        border-radius: 10px;
        border: 1px solid #eee;
        box-shadow: 1px 1px 1px #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.service-detail .tab-container a {
  color: #5a0097;
}

.service-detail .el-tabs__header {
  background-color: #510e90;
  padding: 0 40px;
  clip-path: polygon(50% 0%, 100% 60%, 100% 60%, 75% 100%, 0 100%, 0% 60%, 0 0);
}

.service-detail .el-tabs__item {
  color: #fff;
  padding: 8px 20px;
  height: auto;
  transition: all 0.2s ease;
  font-weight: 00;
}

.service-detail .el-tabs__item.is-active {
  padding: 8px 20px;
  font-weight: 600;
}

.service-detail .el-tabs__active-bar,  {
  display: none;
}

.service-detail .el-tabs__nav-wrap {
  padding: 0 20px;
}

.service-detail .el-tabs__nav-wrap::after {
  height: 0;
}

.service-detail .el-tabs--top .el-tabs__item.is-top:last-child,
.service-detail .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
  padding-right: 20px;
}

.service-detail .el-tabs__item.is-active {
  background-color: #fbf5ff;
  color: #111;
}

.service-detail .el-tabs__header {
  margin-bottom: 1px;
}
</style>
