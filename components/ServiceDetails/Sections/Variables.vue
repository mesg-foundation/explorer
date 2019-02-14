<template>
  <div class="variables">
    <div v-for="(variable, key) in variables" :key="key" class="service">
      <div class="title">{{ key }}</div>
      <div class="vars">
        <el-row v-for="v in variable" :key="v.name" class="var">
          <el-col class="right" :span="8"><div class="name">{{ v.name }}</div></el-col>
          <el-col :span="16"><div class="value">{{ v.value }}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variables: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.variables {
  font-weight: 400;
  font-size: 15px;

  .service {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }

    .title {
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  }

  .vars {
    .right {
      text-align: right;
      padding-right: 10px;
    }

    .var {
      padding: 7px 0;

      .name {
        font-weight: 600;
        box-shadow: 0 1px 1px rgba(255, 233, 209, 0.4);
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 12px;
        display: inline-block;
        color: #ff8e0f;
        border: 1px dashed #ffd7ab;
      }

      .value {
        color: #222;
        font-weight: 300;
        padding: 5px 15px;
        font-size: 13px;
      }
    }
  }
}
</style>