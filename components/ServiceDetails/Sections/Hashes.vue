<template>
  <div class="hashes">
    <el-row v-for="(version, index) in versions" :key="version.hash" class="version">
      <el-col class="number" :span="6">
        <Label v-if="index == 0" class="latest" name="latest" uppercase background="#ff9b2b" color="#fff"/>
        <font-awesome-icon class="icon" icon="tag" />
        v{{ version.number }}
      </el-col>
      <el-col class="detail" :span="16">
        <nuxt-link :to="'/services/'+sid+'/'+version.hash">{{ version.hash }}</nuxt-link>
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
    versions: {
      type: Array,
      required: true
    },
    sid: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>