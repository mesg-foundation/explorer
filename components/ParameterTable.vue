<template>
  <v-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="params"
    disable-filtering
    disable-pagination
    hide-default-footer
    disable-sort
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

<style lang="scss">
.root-table td {
  vertical-align: top;
  padding-top: 12px;
}

th {
  color: #3C3940!important;
  font-size: 12px;
  strong {
      font-weight: 600;
  }
}

tbody {
  tr:hover {
    background: rgba(231,210,249,.15)!important;
  }
  td {
    color: #3C3940;
    font-size: 14px;
    strong {
      font-weight: 600;
      color: #0E061C;
    }
    code {
      margin-right: 10px;
    }
  }
}
</style>
