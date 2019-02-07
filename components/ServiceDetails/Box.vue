<template>
  <div class="box">
    <div v-for="item in items" :key="item.name" class="item">
      <Label class="label" :name="item.name" uppercase/>
      <div v-if="item.link" class="text">
        <nuxt-link :to="item.link">{{ item.text }}</nuxt-link>
      </div>
      <div v-else class="text">{{ item.text }}</div>
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
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
  font-size: 13px;
  font-weight: 300;
  border-radius: 10px;
  padding: 10px 25px;
  box-shadow: 1px 1px 1px #eee;
  border: 1px solid #eee;
  margin-right: 40px;

  .item {
    margin: 20px 0;

    .label {
      font-weight: 600;
      margin-right: 10px;
      // border: 1px solid #999;
      // background-color: #fff;
    }

    span.dotted {
      border-bottom: 1px dashed #555;
    }

    .text {
      margin: 9px 1px;

      .icon {
        margin-right: 8px;
        color: #3d0065;
      }

      a {
        color: #222;
        border-bottom: 1px dashed #d8d8d8;
        display: inline-block;

        &:hover {
          border-bottom: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .box {
    margin-top: 20px;
  }
}
</style>