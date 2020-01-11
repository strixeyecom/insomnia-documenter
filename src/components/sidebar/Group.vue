<template lang="pug">
  div
    a.sidebar-list-link.folder.name(
      v-if='!root'
      href='javascript:;'
      :class='{ expanded }'
      @click='toggle'
    ) {{ name }}

    ul(v-if='expanded')
      li.folder(v-for='child, idx in children')
        sidebar-group(
          :name='child.name'
          :children='child.children'
          :requests='child.requests'
        )
      li.request(v-for='request, idx in requests')
        sidebar-request(:request='request')
</template>

<script>
import Request from '@/components/sidebar/Request';

export default {
  name: 'sidebar-group',

  components: {
    'sidebar-request': Request
  },

  props: {
    root: { type: Boolean, default: false },
    isExpanded: { type: Boolean, default: false },
    name: { type: String, required: true },
    children: { type: Array, required: true },
    requests: { type: Array, required: true }
  },

  data () {
    return {
      expanded: this.isExpanded
    };
  },

  methods: {
    toggle () {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
  .sidebar-list-link.folder::before {
    font-family: FontAwesome;
    content: "\f07b";
  }

  .sidebar-list-link.folder.expanded::before {
    content: "\f07c";
  }

  ul {
    list-style-type: none;
    padding-inline-start: 15px;
    font-size: 12px;
  }
</style>
