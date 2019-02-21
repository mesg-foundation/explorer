<template>
  <div class="offers">
    <el-table
      :data="offers"
      style="width: 100%">
      <el-table-column
        prop="index"
        label="Index"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price in MESG Tokens">
      </el-table-column>
      <el-table-column
        prop="duration"
        label="Duration in seconds">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status">
          <template slot-scope="scope">
            <div class="status" :title="scope.row.active ? 'active' : 'passive'">
              <status-indicator :positive="scope.row.active"></status-indicator>
            </div>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'
import { StatusIndicator } from 'vue-status-indicator'
import 'vue-status-indicator/styles.css'

export default {
  components: {
    StatusIndicator,
    Label
  },

  props: {
    offers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.offers {
  .status {
    text-align: center;
  }
}
</style>