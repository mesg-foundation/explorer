<template>
  <v-data-table
    v-bind="$attrs"
    disable-filtering
    disable-pagination
    hide-default-footer
    disable-sort
    :headers="headers"
    :items="params"
    class="elevation-1 root-table"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>
          <strong>{{ item.key }}</strong>
        </td>
        <td>
          <code>{{ item.optional ? false : true }}</code>
        </td>
        <td>
          <code>{{ !!item.repeated }}</code>
        </td>
        <td v-if="hasNested(item)" colspan="2" class="pr-0">
          <p>{{ item.description || '&nbsp;' }}</p>
          <ParameterTable :params="item.object" />
        </td>
        <td v-else>
          <code>{{ item.type }}</code>
        </td>
        <td v-if="!hasNested(item)">
          {{ item.description }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ParameterTable',
  props: {
    params: {
      type: Array,
      required: true
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Key', value: 'key' },
        { text: 'Required', value: 'required' },
        { text: 'List', value: 'repeated' },
        { text: 'Type', value: 'type' },
        { text: 'Description', value: 'description' }
      ]
    }
  },
  methods: {
    hasNested(item) {
      return item.type === 'Object' && item.object
    }
  }
}
</script>

<style>
.root-table td {
  vertical-align: top;
  padding-top: 12px;
}
</style>
