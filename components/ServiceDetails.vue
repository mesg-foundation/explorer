<template>
  <section class="container">
    <div class="service-detail">
      <div class="info">
        <ServiceLogo :url="logo" :size=120 />
        <div class="prime">
          <div class="name">{{ name }}</div>
          <div class="sid"><Label name="sid" uppercase/>{{ sid }}</div>
          <div class="description">{{ description }}</div>
        </div>
      </div>
      <div class="content">
        <no-ssr>
          <el-tabs v-model="activeDescription">
            <el-tab-pane label="DOC" name="doc">
              <div class="doc markdown-body" v-html="doc"></div>
            </el-tab-pane>
            <el-tab-pane label="DEFINITON" name="defnition">
              todo
            </el-tab-pane>
          </el-tabs>
        </no-ssr>
      </div>
    </div>
  </section>
</template>

<script>
import * as Remarkable from 'remarkable'
import ServiceLogo from '~/components/ServiceLogo.vue'
import Label from '~/components/Label.vue'
import doc from 'raw-loader!~/static/delete-1.md'
import json from '~/static/delete-2.json'

export default {
  components: {
    ServiceLogo,
    Label
  },

  computed: {
    doc() {
      return (new Remarkable('full', {
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      })).render(doc);
    },

    yaml(){
      return YAML.stringify(json)
    }
  },

  data() {
    return {
      activeDescription: 'doc'
    }
  },

  props: ['name', 'sid', 'description', 'logo']
}
</script>

<style lang="scss" scoped>
.service-detail {
  .info {
    display: flex;
    padding: 60px;
    background-color: #fff;
    box-shadow: 1px 2px #eee;

    .prime {
      .name {
        font-size: 30px;
        color: #111;
        font-weight: 400;
      }

      .sid {
        font-size: 15px;
        color: #555;
        margin-top: 12px;
      }

      .description {
        color: #333;
        font-weight: 300;
        font-size: 15px;
        margin-top: 20px;
      }
    }
  }

  .content {
    margin: 40px 60px;

    .doc {
      color: #222;
      background-color: #fff;
      font-family: 'Open Sans';
      font-size: 15px;
      font-weight: 300;
      border-radius: 10px;
      padding: 40px;
    }
  }
}
</style>