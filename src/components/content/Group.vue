<template lang="pug">
  .row
    .left
      h2 {{ groupData.name }}
      .description(v-if='description', v-html='description')
      hr
    .right
</template>

<script>
import applyEnv from '@/lib/applyEnv';
import markdown from '@/lib/markdown';

export default {
  name: 'group',

  props: {
    group: Object,
    env: Object
  },

  computed: {
    groupData () {
      return {
        name: applyEnv(this.group.name, this.env),
        description: applyEnv(this.group.description, this.env)
      };
    },

    description () {
      return this.groupData.description && markdown.makeHtml(this.groupData.description);
    }
  }
};
</script>
