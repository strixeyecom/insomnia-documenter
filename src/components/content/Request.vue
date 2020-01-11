<template lang="pug">
  .row
    .left
      .anchor(:id='request._id') &nbsp;
      h3.request-title
        strong(:class='request.method.toLowerCase()') {{ request.method }}
        |
        | {{ reqData.name }}
      pre.url {{ reqData.url }}

      .description(v-if='description', v-html='description')

      .tables
        data-table(
          v-if='request.parameters && request.parameters.length'
          :data='content.params()'
        )
        data-table(
          v-if='request.headers && request.headers.length || (request.authentication && request.authentication.type)'
          :data='content.headers()'
        )
        data-table(
          v-if='request.body && (request.body.text || request.body.params)'
          :data='content.body()'
        )
      hr

    .right
      .code-example
        .header
          .title Example request:
          .copy
            a(
              href='javascript:;'
              v-clipboard:copy='exampleCode'
              v-clipboard:success='handleCopySuccess'
              v-clipboard:error='handleCopyError'
            ) {{ copyButtonText }}
        vue-hljs-lite(:code='exampleCode', :language='language')

      .code-example.example-response(v-if='exampleResponse')
        .header
          .title Example response:
        vue-hljs-lite(:code='exampleResponse')
</template>

<script>
import markdown from '@/lib/markdown';
import applyEnv from '@/lib/applyEnv';
import generateCode from '@/lib/generateCode';
import ContentGenerator from '@/lib/content';

import Table from '@/components/content/Table';

export default {
  name: 'request',

  props: {
    request: { type: Object, required: true },
    env: { type: Object, required: true },
    language: { type: String, required: true },
    cookiejars: { type: Array, required: true }
  },

  components: {
    'data-table': Table
  },

  data () {
    return {
      content: new ContentGenerator(this.request),
      copyButtonText: 'Copy to Clipboard'
    };
  },

  computed: {
    reqData () {
      return {
        method: this.request.method,
        url: applyEnv(this.request.url, this.env),
        name: applyEnv(this.request.name, this.env),
        description: applyEnv(this.request.description, this.env),
        exampleResponse: applyEnv(this.request.exampleResponse, this.env)
      };
    },

    exampleCode () {
      return generateCode(this.request, this.reqData.url, this.language, this.cookiejars);
    },

    exampleResponse () {
      return this.reqData.exampleResponse;
    },

    description () {
      return this.reqData.description && markdown.makeHtml(this.reqData.description);
    }
  },

  methods: {
    handleCopySuccess () {
      this.copyButtonText = 'Copied!';
      setTimeout(() => {
        this.copyButtonText = 'Copy to Clipboard'
      }, 5000);
    },

    handleCopyError () {
      this.copyButtonText = 'Failed to copy :(';
      setTimeout(() => {
        this.copyButtonText = 'Copy to Clipboard'
      }, 5000);
    }
  }
};
</script>

<style lang="scss">
  .anchor {
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
  }
  pre.url {
    padding: 8px;
    background: #e9e9e9;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
    overflow-x: auto;
  }
  .code-example .header {
    display: flex;
    justify-content: space-between;
    background: #404040;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  .code-example .header .title, .code-example .header .copy a {
    padding: 8px 15px;
  }
  .code-example .header .copy a {
    display: inline-block;
    text-decoration: none !important;
    color: #fff;
    background: #333;
  }
  .code-example pre {
    padding: 10px 15px;
    border: 1px solid #404040;
    border-top: 0;
    margin: 0;
    white-space: pre-wrap;
  }
  .example-response {
    margin-top: 25px;
  }
  .example-response .header {
    background: #675bc0;
  }
  .example-response pre {
    border-color: #675bc0;
  }
</style>
