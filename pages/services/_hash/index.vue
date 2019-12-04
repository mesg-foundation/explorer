<template>
  <div v-html="readme" class="markdown" />
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  head() {
    return {
      title: `${this.service.name} - Readme`
    }
  },
  data() {
    return {
      readme: ''
    }
  },
  async mounted() {
    const resp = await fetch(`/api/readme/${this.service.source}`)
    this.readme = await resp.text()
  }
}
</script>

<style lang="scss">
@import 'vuetify/src/styles/main';

.markdown {
  table {
    /* border: solid 1px rgba(0, 0, 0, 0.2); */
    border-collapse: collapse;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    margin-bottom: 1em;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: 0.5em 1em;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);

    code {
      margin-bottom: 0;
    }
  }

  h1 {
    @extend .display-1, .mb-4, .mt-4;
  }

  h2 {
    @extend .headline, .mb-3, .mt-3;
  }

  h3 {
    @extend .subtitle-1, .mb-2, .mb-2;
  }

  h4 {
    @extend .subtitle-2, .mb-1, .mb-1;
  }

  code {
    padding-right: 0.5em;
    padding-left: 0.5em;
    margin-bottom: 1em;
    &::after,
    &::before {
      display: none;
    }
  }
}
</style>
