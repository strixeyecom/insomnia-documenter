<template lang="pug">
  aside(:class='{ visible }')
    request-group(
      :name='config.workspace.name'
      :children='config.groups'
      :requests='config.requests'
      :root='true'
      :isExpanded='true'
    )
</template>

<script>
import Group from '@/components/sidebar/Group';

export default {
  name: 'sidebar',

  components: {
    'request-group': Group
  },

  props: {
    config: { type: Object, required: true },
    visible: { type: Boolean, required: true }
  }
};
</script>

<style lang="scss">
  aside {
    background: #f6f6f6;
    width: 260px;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    overflow: auto;
    text-overflow: clip;
    white-space: nowrap;
    z-index: 10001;

    &.visible {
      display: block;
    }
  }
</style>
