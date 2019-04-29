<template>
  <div class="api">
    <div v-if="events" class="item">
      <div class="title">events</div> 
      <el-collapse class="content" accordion>
        <el-collapse-item v-for="event in events" :key="event.ke" :name="event.ke">
          <template slot="title"> {{ event.key }} </template>
          <div class="text" v-for="data in event.data" :key="data.key">
            <el-row>
              <el-col :span="12">{{ data.key }}</el-col>
              <el-col :span="6"><Label class="var-info" :name="data.type"/></el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-if="tasks" class="item">
      <div class="title">tasks</div> 
      <el-collapse class="content" accordion>
        <el-collapse-item v-for="task in tasks" :key="task.key" :name="task.key">
          <template slot="title"> {{ task.key }} </template>
          <div v-if="task.inputs">
            <div class="sub-title">inputs</div>
            <div class="text" v-for="data in task.inputs" :key="data.key">
              <el-row>
                <el-col :span="12">{{ data.key }}</el-col>
                <el-col :span="6"><Label class="var-info" :name="data.type"/></el-col>
                <el-col :span="6"><Label v-if="!data.optional" class="var-info required" name="required"/></el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="description">{{ data.description }}</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="sub-title">outputs</div>
          <el-collapse v-for="output in task.outputs" :key="output.key" class="content" accordion>
            <el-collapse-item name="call.outputs">
              <template slot="title">{{ output.key }}</template>
              <div v-for="data in output.data" :key="data.key"  class="text">
                <el-row>
                  <el-col :span="12">{{ data.key }}</el-col>
                  <el-col :span="6"><Label class="var-info" :name="data.type"/></el-col>
                  <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="description">{{ data.description }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Label from '~/components/Label.vue'

export default {
  components: {
    Label
  },
  
  props: {
    events: {
      type: Array
    },
    tasks: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.api {
  font-size: 15px;

  .item {
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

    .sub-title {
      font-size: 14px;
      font-weight: 300;
      color: #999;
      padding-bottom: 5px;
      clear: both;
    }

    .description {
      color: #666;
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      margin-bottom: 9px;
    }
  }

  .content {
    padding: 0 20px;

    .section {
      margin-bottom: 10px 0;
    }

    .text {
      font-size: 16px;
      font-weight: 600;
      height: 48px;
      line-height: 48px;
      padding: 0 20px;

      .var-info {
        text-align: right;
        font-size: 12px;
        padding: 3px 8px;
        color: #222;
        font-weight: 400;
        margin: 0 0 0 10px;
      }

      .var-info.required {
        border: 1px solid #ff8e0f;
        color: #ff8e0f;
        background-color: #fff;
      }
    }
  }
}
</style>


<style lang="scss">
.api .el-collapse-item:last-child .el-collapse-item__header {
  border-bottom: 0;
}

.api .el-collapse {
  border-top: 0;
  border-bottom: 0;
}

.api .el-collapse-item__header {
  font-size: 16px;
}

.api .el-collapse-item__wrap {
  border-bottom: 0;
}
</style>