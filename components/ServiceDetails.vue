<template>
  <section class="container">
    <div class="service-detail">
      <div class="info">
        <ServiceLogo :url="logo" :size=120 />
        <div class="prime">
          <div class="name">{{ name }}
            <el-dropdown class="select-version" size="mini" split-button title="service's hash">
              viewing <span>e83ed33</span>
              <el-dropdown-menu slot="dropdown">
                <nuxt-link :to="'/services/'+usid">
                  <el-dropdown-item>go to latest</el-dropdown-item>
                </nuxt-link>
                <a href="#hashes">
                  <el-dropdown-item>see all hashes</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="sid"><Label name="sid" uppercase/>{{ sid }}</div>
          <div class="description">{{ description }}</div>
        </div>
        <div class="actions">
          <div class="deploy">
            <div class="title">deploy with command</div>
            <el-tooltip class="item" effect="light" content="copied!" placement="top-end" :manual="true" :value="copied">
            <div class="command" v-on:click="copyDeploy">mesg-core service deploy <strong>{{ sid }}</strong>
              <font-awesome-icon class="icon" icon="copy" size="lg" /></div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="content">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-tabs v-model="activeDescription" @tab-click="handleTabClick">
              <el-tab-pane label="DOC" name="doc">
                <div class="doc markdown-body" v-html="doc"></div>
              </el-tab-pane>
              <el-tab-pane label="API" name="api">
                todo
              </el-tab-pane>
              <el-tab-pane label="VARIABLES" name="variables">
                todo
              </el-tab-pane>
              <el-tab-pane label="HASHES" name="hashes">
                <div class="doc hashes">
                  <el-row v-for="(version, index) in versions" :key="version.hash" class="version">
                    <el-col class="number" :span="6">
                      <Label v-if="index == 0" class="latest" name="latest" uppercase background="#ff9b2b" color="#fff"/>
                      <font-awesome-icon class="icon" icon="tag" />
                      v{{ version.number }}
                    </el-col>
                    <el-col class="detail" :span="16">
                      <nuxt-link :to="'/services/'+usid+'/'+version.hash">{{ version.hash }}</nuxt-link>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
            <div class="box">
              <div class="item">
                <Label class="label" name="author" uppercase/>
                <div class="text">ilgooz</div>
              </div>
              <div class="item">
                <Label class="label" name="sid" uppercase/>
                <div class="text">{{ sid }}</div>
              </div>
              <div class="item">
                <Label class="label" name="mesg token price" background="#ff9b2b" color="#fff" uppercase />
                <div class="text"><font-awesome-icon class="icon" icon="coins" /><span class="dotted">0.04</span> per execution</div>
              </div>
              <div class="item">
                <Label class="label" name="latest hash" uppercase/>
                <div class="text">e83ed33</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import * as Remarkable from 'remarkable'
import * as copy from 'copy-text-to-clipboard'
import * as scrollTo from 'scroll-to-element'
import ServiceLogo from '~/components/ServiceLogo.vue'
import Label from '~/components/Label.vue'
import json from '~/static/delete-2.json'

export default {
  components: {
    ServiceLogo,
    Label
  },

  data() {
    return {
      activeDescription: 'doc',
      copied: false
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

    yaml(){
      return YAML.stringify(json)
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
    }
  },

  props: ['name', 'sid', 'usid', 'description', 'logo', 'readme', 'versions']
}
</script>

<style lang="scss" scoped>
.service-detail {
  .info {
    display: flex;
    padding: 60px;
    background-color: #fff;
    box-shadow: 1px 2px 3px #eee;

    .prime {
      .name {
        font-size: 30px;
        color: #111;
        font-weight: 400;
        vertical-align: middle;
      }

      .sid {
        font-size: 15px;
        color: #555;
        margin-top: 12px;

        span {
          margin-right: 10px;
        }
      }

      .description {
        color: #333;
        font-weight: 300;
        font-size: 15px;
        margin-top: 20px;
        line-height: 23px;
      }

      .select-version {
        vertical-align: middle;

        span {
          font-weight: 400;
        }
      }
    }

    .actions {
      margin-left: auto;
      margin-top: auto;
      padding-left: 40px;
      border-left: 1px solid #eee;

      .deploy {
        .title {
          font-size: 12px;
          color: #666;
          font-weight: 300;
          text-transform: uppercase;
        }

        .command {
          background: #1f1f1f;
          font-weight: 400;
          font-size: 13px;
          padding: 13px 20px;
          margin-top: 10px;
          transition: all 0.2s ease;
          color: #efefef;
          cursor: pointer;
          user-select: none;
          border-radius: 25px;
          display: inline-block;
          line-height: 25px;
          white-space: nowrap;

          &::before {
            content: "$";
            font-size: 14px;
            margin-right: 6px;
          }

          &:hover {
            background-color: #000;
            color: #fff;

            .icon {
              opacity: 1;
            }
          }

          strong {
            font-weight: 600;
          }

          .icon {
            vertical-align: middle;
            margin-left: 15px;
            opacity: .9;
            transition: all 0.2s ease;
          }
        }
      }
    }
  }

  .content {
    margin: 40px 60px;

    .doc {
      color: #222;
      background-color: #fff;
      font-family: 'Open Sans';
      font-size: 15px;
      font-weight: 300;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 1px 2px 3px #eee;
    }

    .box {
      background-color: #fff;
      font-size: 13px;
      font-weight: 300;
      border-radius: 10px;
      padding: 10px 25px;
      box-shadow: 1px 2px 3px #eee;

      .item {
        margin: 20px 0;

        .label {
          font-weight: 400;
          margin-right: 10px;
        }

        span.dotted {
          border-bottom: 1px dashed #555;
        }

        .text {
          margin: 9px 1px;

          .icon {
            margin-right: 8px;
            color: #3d0065;
          }
        }
      }
    }

    .hashes {
      font-size: 14px;

      .version {
        .el-col {
          padding: 10px 0;
        }

        .number {
          color: #555;
          font-weight: 400;
          border-right: 5px solid #eee;
          text-align: right;
          padding-right: 20px;

          .latest {
            display: inline-block;
            margin-right: 10px;
          }

          .icon {
            color: #e0e0e0;
            margin-right: 5px;
          }
        }

        .detail {
          padding-left: 20px;

          a {
            color: #555;
            border-bottom: 1px dashed #eee;

            &:hover {
              border: 0;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    .info {
      display: block;
      padding: 30px;

      .prime {
        margin-top: 0;
      }

      .actions {
        margin-top: 20px;
        border-left: 0;
        padding-left: 0;

        .deploy {
          .title {
            display: none;
          }
          
          .command {
            white-space: normal;

            .icon {
              margin-left: 3px;
            }
          }
        }
      }
    }

    .content {
      margin: 15px 20px;

      .box {
        margin-top: 20px;
      }
    }
  }
}
</style>

<style lang="scss">
.doc a {
  color: #5a0097;
}

.el-tabs__item {
  font-weight: 600;
}

.prime {
  .select-version .el-button--mini {
    font-size: 12px;
    font-weight: 300;
  }

  .select-version .el-button {
    color: #111;
    // background-color: #eee;
    // border: 0;
  }
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  font-size: 13px;
}
</style>
