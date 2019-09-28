<template>
  <div class="markdown" v-html="service.readme" />
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.markdown table {
  /* border: solid 1px rgba(0, 0, 0, 0.2); */
  border-collapse: collapse;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 1em;
}

.markdown th,
.markdown td {
  padding: 0.5em 1em;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5 {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
