<template>
  <section class="container">
    <div class="service-detail">
      <div class="info">
        <ServiceLogo :url="logo" :size=120 />
        <div class="prime">
          <div class="name">{{ name }}</div>
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
        <no-ssr>
          <el-tabs v-model="activeDescription">
            <el-tab-pane label="DOC" name="doc">
              <div class="doc markdown-body" v-html="doc"></div>
            </el-tab-pane>
            <el-tab-pane label="DEFINITON" name="defnition">
              todo
            </el-tab-pane>
          </el-tabs>
        </no-ssr>
      </div>
    </div>
  </section>
</template>

<script>
import * as Remarkable from 'remarkable'
import * as copy from 'copy-text-to-clipboard'
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

  methods: {
    copyDeploy() {
      copy(`mesg-core service deploy ${this.sid}`)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 600)
    }
  },

  props: ['name', 'sid', 'description', 'logo', 'readme']
}
</script>

<style lang="scss" scoped>
.service-detail {
  .info {
    display: flex;
    padding: 60px;
    background-color: #fff;
    box-shadow: 1px 2px #eee;

    .prime {
      .name {
        font-size: 30px;
        color: #111;
        font-weight: 400;
      }

      .sid {
        font-size: 15px;
        color: #555;
        margin-top: 12px;
      }

      .description {
        color: #333;
        font-weight: 300;
        font-size: 15px;
        margin-top: 20px;
        line-height: 23px;
      }
    }

    .actions {
      margin-left: auto;
      margin-top: auto;
      padding-left: 20px;
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
    }
  }
}
</style>