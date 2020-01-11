<template lang="pug">
  .docs
    div(v-for='row, idx in content', :key='idx')
      Request(
        v-if='row._type === "request"'
        :request='row'
        :env='env'
        :language='language'
        :cookiejars='cookiejars'
      )
      div(v-else)
        Group(:group='row', :env='env')
        Rows(
          :content='[ ...row.requests, ...row.children ]'
          :env='env'
          :language='language'
          :cookiejars='cookiejars'
        )
</template>

<script>
import Request from '@/components/content/Request';
import Group from '@/components/content/Group';

export default {
  name: 'Rows',

  props: {
    content: { type: Array, required: true },
    env: { type: Object, required: true },
    language: { type: String, required: true },
    cookiejars: { type: Array, required: true }
  },

  components: {
    Request,
    Group
  }
};
</script>
