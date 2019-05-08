<template>
  <div class="info">
    <div class="prime">
      <div class="name">
        {{ definition.name }}
        <el-dropdown class="select-version" size="mini" split-button title="service's hash">
          viewing
          <span>{{ shortCurrentVersion }}</span>
          <Label v-if="versionHash == service.latestVersion" class="latest" name="latest"/>
          <el-dropdown-menu slot="dropdown">
            <nuxt-link :to="'/services/'+definition.sid">
              <el-dropdown-item v-if="versionHash != service.latestVersion">go to latest</el-dropdown-item>
            </nuxt-link>
            <a href="#versions">
              <el-dropdown-item>see all versions</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="sid">
        <Label name="sid" uppercase/>
        {{ definition.sid }}
      </div>
      <div class="description">{{ definition.description }}</div>
    </div>
    <div class="actions">
      <div class="deploy">
        <el-button type="primary" round @click="dialogVisible = true">
          <span v-if="free">Get this service</span>
          <span v-else>Buy for {{ service.offers[0].price }} MESG</span>
        </el-button>

        <el-dialog :title="`Get the service ${definition.name}`" :visible.sync="dialogVisible">
          <Purchase :service="service" :versionHash="versionHash"/>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'
import Purchase from '~/components/Purchase.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Label,
    Purchase
  },

  props: {
    service: {
      type: Object,
      required: true
    },
    versionHash: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialogVisible: false
    }
  },

  computed: {
    ...mapGetters({
      versionsByHash: 'versionsByHash'
    }),
    definition() {
      return this.versionsByHash[this.versionHash].manifestData.service
        .definition
    },
    shortCurrentVersion() {
      return this.versionHash.substring(0, 10)
    },

    shortLastVersion() {
      return this.service.latestVersion.substring(0, 10)
    },
    free() {
      return (
        this.service.offers.length === 0 ||
        !!this.service.offers.find(x => parseFloat(x.price) === 0)
      )
    }
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
      margin-left: 10px;

      span {
        font-weight: 400;
      }

      .latest {
        margin: 0 0 0 5px;
        background-color: #ff9b2b;
        color: #fff;
      }
    }
  }

  .actions {
    margin-left: auto;
    margin-top: auto;
    padding-left: 40px;

    .deploy {
      .title {
        font-size: 12px;
        color: #666;
        font-weight: 300;
        text-transform: uppercase;
      }

      .command-container {
        margin-top: 10px;
        user-select: none;
        transition: all 0.2s ease;
        color: #efefef;
        display: inline-block;
        line-height: 25px;
        cursor: pointer;

        &::after {
          clear: both;
        }

        &:hover {
          .command {
            background-color: #000;
            color: #fff;
          }

          .icon-container .icon {
            opacity: 1;
          }
        }

        .command {
          float: left;
          background: #1f1f1f;
          font-weight: 400;
          font-size: 13px;
          padding: 12px 20px;
          border-radius: 25px 0 0 25px;
          white-space: nowrap;
          width: 400px;
          height: 50px;
          overflow: auto;

          &::before {
            content: '$';
            font-size: 14px;
            margin-right: 6px;
          }
        }

        .icon-container {
          float: left;
          height: 50px;
          padding: 10px 13px;
          width: 40px;
          border-radius: 0 25px 25px 0;
          background: #1f1f1f;

          .icon {
            opacity: 0.9;
            font-weight: 400;
            font-size: 13px;
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

        .command-container {
          white-space: normal;

          .command {
            width: 250px;
          }

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
      padding: 9px 6px 8px 15px;
    }

    .el-button {
      color: #111;
      // background-color: #eee;
      // border: 0;
    }

    button:first-child {
      border-radius: 25px 0 0 25px;
    }

    button.el-dropdown__caret-button {
      border-radius: 0 25px 25px 0;
    }
  }
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  font-size: 13px;
}
</style>
