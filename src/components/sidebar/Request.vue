<template lang="pug">
  a.sidebar-list-link.name(:href='requestHref')
    strong(:class='request.method.toLowerCase()') {{ request.method }}
    span {{ request.name }}
</template>

<script>
export default {
  name: 'sidebar-request',
  props: {
    request: { type: Object, required: true }
  },
  computed: {
    requestHref () {
      return `#${this.request._id}`;
    }
  }
};
</script>
