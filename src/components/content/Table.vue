<template lang="pug">
  .table
    .header
      span.title {{ data.title }}
      span.note(v-if='data.note') {{ data.note }}

    .raw-data(v-if='data.text', v-html='data.text')

    div(
      v-if='data.rows && data.rows.length'
      v-for='row in data.rows'
    )
      .row
        .name {{ row.name }}
        .value(v-html='row.value')

      .row.description(v-if='row.description', v-html='row.description')
</template>

<script>
export default {
  name: 'data-table',

  props: {
    data: { type: Object, required: true }
  }
};
</script>

<style lang="scss">
  .table {
    padding: 10px 0;
    border-bottom: 1px solid #cdcdcd;
    margin-bottom: 20px;

    .header {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;

      span, .note {
        display: inline-block;
        vertical-align: middle;
      }

      .note {
        font-size: 12px;
        margin-left: 5px;
        padding: 3px 5px;
        background: #ababab;
        border-radius: 3px;
        color: #fff;
      }
    }

    .row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;

      .name, .value {
        padding: 10px 0;
        overflow-wrap: break-word;
      }

      .name {
        font-weight: 600;
        min-width: 25%;
      }

      .value {
        width: 75%;
      }

      &.description {
        color: #787878;
        margin-bottom: 10px;
      }
    }
  }
</style>
