<template>
  <div>
    <el-table
      :data="purchases"
      style="width: 100%">
      <el-table-column
        prop="purchaser"
        label="Purchaser">
      </el-table-column>
      <el-table-column
        prop="expire"
        label="Expiration Date">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'

export default {
  components: {
    Label
  },

  props: {
    purchases: {
      type: Array,
      required: true
    }
  }
}
</script>