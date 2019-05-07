<template>
  <div class="offers">
    <el-table :data="offers" style="width: 100%">
      <el-table-column prop="offerIndex" label="Index" width="180"></el-table-column>
      <el-table-column prop="price" align="right" label="Price">
        <template slot-scope="scope">{{ scope.row.price }} MESG</template>
      </el-table-column>
      <el-table-column prop="duration" align="right" label="Duration">
        <template
          slot-scope="scope"
        >{{ duration(scope.row.duration).value }} {{ duration(scope.row.duration).unit }}</template>
      </el-table-column>
      <el-table-column prop="status" align="right" label="Status">
        <template slot-scope="scope">
          <status-indicator :positive="scope.row.active"></status-indicator>
        </template>
      </el-table-column>
      <el-table-column label="Purchase" align="right">
        <template slot-scope="scope">
          <el-button @click="select(scope.row)">Purchase</el-button>
          <el-dialog :title="`Purchase offer`" :visible.sync="dialogVisible" append-to-body>
            <div v-if="offer">
              <Box
                :items="[
                { name: 'price', text: `${offer.price} MESG` },
                { name: 'duration', text: [duration(offer.duration).value, duration(offer.duration).unit].join(' ') }
              ]"
              />
              <p>Run the following command to purchase this offer:</p>
              <code>mesg-core marketplace purchase {{"SID"}} {{"ID"}}</code>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'
import Box from '~/components/Service/Box.vue'
import { StatusIndicator } from 'vue-status-indicator'
import 'vue-status-indicator/styles.css'

export default {
  components: {
    StatusIndicator,
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