<template lang="pug">
  section.content
    .row
      .left
        h1 {{ workspace.name }}
        .description(
          v-if='description && description.length'
          v-html='description'
        )
      .right
        .language-selector
          v-select(
            :options='languages'
            v-model='language'
            :clearable='false'
            :searchable='false'
          )
    Rows(
      :content='content'
      :env='env'
      :language='language.value'
      :cookiejars='cookiejars'
    )
</template>

<script>
import markdown from '@/lib/markdown';
import applyEnv from '@/lib/applyEnv';

import Rows from '@/components/content/Rows';

export default {
  name: 'Content',

  components: {
    Rows
  },

  props: {
    env: { type: Object, required: true },
    groups: { type: Array, required: true },
    requests: { type: Array, required: true },
    workspace: { type: Object, required: true },
    cookiejars: { type: Array, required: true }
  },

  data () {
    return {
      language: { value: 'curl', label: 'cURL' }
    };
  },

  computed: {
    languages () {
      return [
        { value: 'curl', label: 'cURL' },
        { value: 'javascript', label: 'JavaScript (fetch)' },
        { value: 'python', label: 'Python (requests)' },
        { value: 'node', label: 'Node.js (node-request)' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'php', label: 'PHP' },
        { value: 'golang', label: 'Go' }
      ]
    },

    content () {
      return [ ...this.groups, ...this.requests ];
    },

    description () {
      return this.workspace.description && markdown.makeHtml(applyEnv(this.workspace.description, this.env));
    }
  }
};
</script>

<style lang="scss">
  .content {
    margin-left: 260px;
  }

  .language-selector {
    text-align: center;
  }
</style>
