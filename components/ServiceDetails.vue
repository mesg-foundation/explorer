<template>
  <section class="container">
    <div class="service-detail">
      <div class="info">
        <ServiceLogo :url="logo" :size=120 />
        <div class="prime">
          <div class="name">{{ name }}
            <el-dropdown v-if="versionRoute" class="select-version" size="mini" split-button title="service's hash">
              viewing <span>{{ versionRoute }}</span>
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
        <el-row>
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-tabs class="main" v-model="activeDescription" @tab-click="handleTabClick">
              <el-tab-pane label="DOC" name="doc">
                <div class="doc markdown-body" v-html="doc"></div>
              </el-tab-pane>
              <el-tab-pane label="API" name="api">
                <div class="doc api">
                  <div class="item">
                    <div class="title">events</div> 
                    <el-collapse class="content" accordion>
                      <el-collapse-item v-for="(event, key) in events" :key="key" :name="key">
                        <template slot="title"> {{ key }} </template>
                        <div class="text" v-for="(data, key) in event.data" :key="key">
                          {{ key }}
                          <Label class="var-info" :name="data.type"/>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                  <div class="item">
                    <div class="title">tasks</div> 
                    <el-collapse class="content" accordion>
                      <el-collapse-item v-for="(task, key) in tasks" :key="key" :name="key">
                        <template slot="title"> {{ key }} </template>
                        <div v-if="task.inputs">
                          <div class="sub-title">inputs</div>
                          <div class="text" v-for="(data, key) in task.inputs" :key="key">
                            {{ key }}
                            <Label class="var-info" :name="data.type"/>
                            <Label v-if="!data.optional" class="var-info required" name="required"/>
                          </div>
                        </div>
                        <div class="sub-title">outputs</div>
                        <el-collapse v-for="(output, key) in task.outputs" :key="key" class="content" accordion>
                          <el-collapse-item name="call.outputs">
                            <template slot="title">{{ key }}</template>
                            <div  v-for="(data, key) in output.data" :key="key"  class="text">
                              {{ key }}
                              <Label class="var-info" :name="data.type"/>
                            </div>
                          </el-collapse-item>
                        </el-collapse>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="VARIABLES" name="variables">
                <div class="doc variables">
                  <div v-for="(variable, key) in variables" :key="key" class="service">
                    <div class="title">{{ key }}</div>
                    <div class="vars">
                      <el-row v-for="v in variable" :key="v.name" class="var">
                        <el-col class="right" :span="8"><div class="name">{{ v.name }}</div></el-col>
                        <el-col :span="16"><div class="value">{{ v.value }}</div></el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
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
                <div class="text">{{ author }}...</div>
              </div>
              <div class="item">
                <Label class="label" name="sid" uppercase/>
                <div class="text">{{ sid }}</div>
              </div>
              <div class="item">
                <Label class="label" name="latest hash" uppercase/>
                <div class="text">
                  <nuxt-link :to="'/services/'+usid+'/'+lastVersion+'#hashes'">{{ lastShortVersion }}</nuxt-link>
                </div>
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

    yaml() {
      return YAML.stringify(json)
    },

    lastVersion() {
      return this.versions[0].hash
    },

    lastShortVersion() {
      return this.shortenHash(this.lastVersion)
    },

    versionRoute() {
      const version = this.$route.params.hash
      if (!version) return false
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

  props: ['name', 'sid', 'usid', 'description', 'logo', 'readme', 'versions', 'variables', 'events', 'tasks', 'owner']
}
</script>

<style lang="scss" scoped>
.service-detail {
  .info {
    display: flex;
    padding: 60px;
    background-color: #fff;

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
          padding: 10px 20px;
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
    .main {
      margin-right: 30px;
    }

    .doc {
      color: #222;
      background-color: #fff;
      font-family: 'Open Sans';
      font-size: 15px;
      font-weight: 300;
      padding: 40px;
      margin: 20px 0 20px 40px;
      border-radius: 10px;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px #eee;
    }

    .box {
      background-color: #fff;
      font-size: 13px;
      font-weight: 300;
      border-radius: 10px;
      padding: 10px 25px;
      box-shadow: 1px 1px 1px #eee;
      border: 1px solid #eee;
      margin-right: 40px;

      .item {
        margin: 20px 0;

        .label {
          font-weight: 600;
          margin-right: 10px;
          // border: 1px solid #999;
          // background-color: #fff;
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

          a {
            color: #222;
            border-bottom: 1px dashed #d8d8d8;
            display: inline-block;

            &:hover {
              border-bottom: 0;
            }
          }
        }
      }
    }

    .hashes {
      font-size: 14px;

      .version {
        border-radius: 25px; 
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

    .title {
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .sub-title {
      font-size: 14px;
      font-weight: 300;
      color: #999;
      padding-bottom: 5px;
    }

    .variables {
      font-weight: 400;

      .service {
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .vars {
        .right {
          text-align: right;
          padding-right: 10px;
        }

        .var {
          padding: 7px 0;

          .name {
            font-weight: 600;
            box-shadow: 0 1px 1px rgba(255, 233, 209, 0.4);
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 12px;
            display: inline-block;
            color: #ff8e0f;
            border: 1px dashed #ffd7ab;
          }

          .value {
            color: #222;
            font-weight: 300;
            padding: 5px 15px;
            font-size: 13px;
          }
        }
      }
    }

    .api {
      .item {
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .content {
        padding: 0 20px;

        .section {
          margin-bottom: 10px 0;
        }

        .text {
          font-size: 16px;
          font-weight: 300;
          height: 48px;
          line-height: 48px;
          padding: 0 20px;

          .var-info {
            text-align: right;
            font-size: 12px;
            padding: 3px 8px;
            color: #222;
            font-weight: 400;
            margin: 0 0 0 10px;
          }

          .var-info.required {
            border: 1px solid #ff8e0f;
            color: #ff8e0f;
            background-color: #fff;
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
      // margin: 15px 20px;

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
  font-weight: 400;
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

.select-version button:first-child  {
  border-radius: 25px 0 0 25px;
}
.select-version button.el-dropdown__caret-button  {
  border-radius: 0 25px 25px 0;
}

.service-detail .api .el-collapse-item:last-child .el-collapse-item__header {
  border-bottom: 0;
}

.service-detail .api .el-collapse {
  border-top: 0;
  border-bottom: 0;
}

.service-detail .api .el-collapse-item__header {
  font-size: 16px;
}

.service-detail .api .el-collapse-item__wrap {
  border-bottom: 0;
}

.markdown-body {
  h1, h2, h3, h4, h5, h5 {
    font-weight: 300;
  }
}
</style>
