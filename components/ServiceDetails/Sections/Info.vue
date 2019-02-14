<template>
  <div class="info">
    <ServiceLogo :url="logo" :size=120 />
    <div class="prime">
      <div class="name">{{ name }}
        <el-dropdown v-if="currentHash" class="select-version" size="mini" split-button title="service's hash">
          viewing <span>{{ currentHash }}</span>
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
</template>

<script>
import * as copy from 'copy-text-to-clipboard'
import ServiceLogo from '~/components/ServiceLogo.vue'
import Label from '~/components/Label.vue'
  
export default {
  components: {
    ServiceLogo,
    Label
  },
  
  data() {
    return {
      copied: false
    }
  },

  methods: {
    copyDeploy() {
      copy(`mesg-core service deploy ${this.sid}`)
      this.copied = true
      setTimeout(() =>  this.copied = false, 600)
    }
  },

  props: {
    name: {
      type: String,
      required: true
    },
    sid: {
      type: String,
      required: true
    },
    usid: {
      type: String,
      required: true
    },
    description: String,
    logo: String,
    currentHash: String
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>

<style lang="scss">
.prime {
  .select-version {
    .el-button--mini {
      font-size: 12px;
      font-weight: 300;
    }

    .el-button {
      color: #111;
      // background-color: #eee;
      // border: 0;
    }

    button:first-child  {
      border-radius: 25px 0 0 25px;
    }

    button.el-dropdown__caret-button  {
      border-radius: 0 25px 25px 0;
    }
  }
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  font-size: 13px;
}
</style>
