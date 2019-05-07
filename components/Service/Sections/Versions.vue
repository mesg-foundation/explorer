<template>
  <div class="versions">
    <el-row v-for="version in service.versions" :key="version.hash" class="version">
      <el-col class="tag" :span="6">
        <Label
          v-if="version.versionHash === service.latestVersion"
          class="latest"
          name="latest"
          uppercase
          background="#ff9b2b"
          color="#fff"
        />
      </el-col>
      <el-col class="detail" :span="16">
        <nuxt-link :to="`/services/${service.sid}/${version.versionHash}`">{{ version.versionHash }}</nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'

export default {
  components: {
    Label
  },

  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.versions {
  font-size: 14px;

  .version {
    border-radius: 25px;

    .el-col {
      padding: 10px 0;
    }

    .tag {
      color: #555;
      font-weight: 400;
      border-right: 2px solid #eee;
      text-align: right;
      padding-right: 20px;

      .latest {
        display: inline-block;
        margin-right: 10px;
      }
    }

    .detail {
      padding-left: 20px;

      a {
        color: #333;
        padding-bottom: 2px;
        border-bottom: 1px dashed #eee;
        font-size: 13px;

        &:hover {
          border: 0;
        }
      }
    }
  }
}
</style>