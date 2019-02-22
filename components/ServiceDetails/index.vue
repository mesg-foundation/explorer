<template>
  <section class="container">
    <div class="service-detail">
      <Info
        class="info"
        :name="name"
        :logo="logo"
        :currentVersion="currentVersion"
        :lastVersion="lastVersion"
        :sid="sid"
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
              <el-tab-pane label="OFFERS" name="offers">
                <Offers
                  class="tab-container"
                  :offers="offers" />
              </el-tab-pane>
              <el-tab-pane label="PURCHASES" name="purchases">
                <Purchases
                  class="tab-container"
                  :purchases="purchases" />
              </el-tab-pane>
              <el-tab-pane label="VERSIONS" name="versions">
                <Versions
                  class="tab-container"
                  :sid="sid"
                  :versions="versions" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col class="sidebar" :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
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
import anchors from '~/plugins/remarkable-anchors'
import * as scrollTo from 'scroll-to-element'
import Box from './Box.vue'
import Info from './Sections/Info'
import Doc from './Sections/Doc'
import API from './Sections/API'
import Variables from './Sections/Variables'
import Versions from './Sections/Versions'
import Offers from './Sections/Offers'
import Purchases from './Sections/Purchases'

export default {
  components: {
    Box,
    Info,
    Doc,
    API,
    Variables,
    Versions,
    Offers,
    Purchases
  },

  data() {
    return {
      activeDescription: 'doc'
    }
  },

  computed: {
    doc() {
      const md = new Remarkable('full', {
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      })
      md.use(anchors)
      return md.render(this.readme);
    },

    yaml() {
      return YAML.stringify(json)
    },

    detail() {
      const detail = [{
        name: 'author',
        text: this.owner
      }, {
        name: 'sid',
        text: this.sid
      }, {
        name: 'latest version',
        text: this.lastVersion.substring(0, 10),
        link: '/services/'+ this.sid +'/'+ this.lastVersion +'#versions'
      }]

      if (this.repository) {
        detail.push({
          name: 'repository',
          text: this.repository,
          link: this.repository
        })
      }

      return detail
    },

    lastVersion() {
      return this.versions[0].hash
    },

    currentVersion() {
      return this.$route.params.hash || this.lastVersion
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
      switch (route) {
      case 'doc':
      case 'api':
      case 'variables':
      case 'versions':
      case 'offers':
      case 'purchases':
        scrollTo(`#tab-${route}`)
        this.activeDescription = route
        break;
      }
    },

    handleTabClick() {
      this.$router.push(`#${this.activeDescription}`)
    },

    shortenHash(hash) {
      return hash
    }
  },

  props: [
    'name',
    'sid',
    'description',
    'logo',
    'readme',
    'versions',
    'variables',
    'events',
    'tasks',
    'owner',
    'offers',
    'purchases'
  ]
}
</script>

<style lang="scss" scoped>
.service-detail {
  .info {
    padding-bottom: 120px;
  }

  .content {
    margin: -57px 0 20px 40px;

    .main {
      margin-right: 40px;

      .tab-container {
        color: #222;
        background-color: #fff;
        font-family: 'Open Sans';
        font-weight: 300;
        padding: 40px;
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
        box-shadow: 1px 1px 1px #eee;
      }
    }

    .sidebar {
      margin-top: 77px;
    }
  }
}

@media screen and (max-width: 992px) {
  .service-detail {
    .content {
      .sidebar {
        margin-top: 20px;
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
  background-color: #fff;
  border-top: 1px solid #eee;
}

.service-detail .el-tabs__item {
  color: #333;
  padding: 8px 20px;
  height: auto;
  transition: all 0.2s ease;
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
  color: #430069;
}

.service-detail .el-tabs__header {
  margin-bottom: 1px;
}
</style>
