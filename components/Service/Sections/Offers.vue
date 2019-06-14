<template>
  <div class="offers">
    <el-table :data="offers" style="width: 100%">
      <el-table-column width="150" prop="price" align="left" label="Price">
        <template slot-scope="scope">{{ scope.row.price }} MESG</template>
      </el-table-column>
      <el-table-column width="150" prop="duration" label="Duration">
        <template
          slot-scope="scope"
        >{{ duration(scope.row.duration).value }} {{ duration(scope.row.duration).unit }}</template>
      </el-table-column>
      <el-table-column label="Purchase command" align="right">
        <template slot-scope="scope">
          <CommandLine
            :value="`mesg-cli marketplace:purchase ${service.sid} ${scope.row.offerIndex}`"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'
import Box from '~/components/Service/Box.vue'
import CommandLine from '~/components/CommandLine'
import { StatusIndicator } from 'vue-status-indicator'
import 'vue-status-indicator/styles.css'

export default {
  components: {
    StatusIndicator,
    CommandLine,
    Label,
    Box
  },

  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    offers() {
      return this.service.offers
    }
  },
  data() {
    return {
      dialogVisible: false,
      offer: null
    }
  },
  methods: {
    duration(value) {
      return {
        value,
        unit: 'seconds'
      }
    },
    select(offer) {
      this.offer = offer
      this.dialogVisible = true
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