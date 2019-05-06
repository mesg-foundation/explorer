<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>MESG Marketplace</span>
          <el-button style="float: right; padding: 3px 0" type="text">close</el-button>
        </div>
        <div>
          explaination about the marketplace with link to article tuto doc etc...
        </div>
      </el-card>
    </div>
    <Services/>
  </div>
</template>

<script>
import Services from '~/components/Services'

export default {
  components: {
    Services
  },

  beforeCreate: function() {
    document.body.className = ''
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 900px;
  margin: 20px auto 0 auto;
}
</style>
