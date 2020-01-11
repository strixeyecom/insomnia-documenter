<template lang="pug">
  .app
    header
      .header-left
        a.hamburger-toggler(
          href='javascript:;'
          @click='toggleHamburger'
        )
          i.fa.fa-bars

        .logo
          img(src='logo.png', :alt='config.workspace.name')

        h1.title {{ config.workspace.name }}

      .header-right
        .run
          a(:href='runInInsomniaLink', target='_blank')
            img(src='https://insomnia.rest/images/run.svg', alt='Run in Insomnia')

        .environment
          span
            | Environment:
            |
          select(@change='updateEnvironment')
            option(
              v-for='env, idx in config.environments'
              :value='idx'
              :key='idx'
            ) {{ env.name }}
    section.wrapper
      Sidebar(:config='config', :visible='menuVisible')
      Content(
        :requests='config.requests'
        :groups='config.groups'
        :workspace='config.workspace'
        :cookiejars='config.cookiejars'
        :env='env'
      )
</template>

<script>
import Sidebar from './components/Sidebar';
import Content from './components/Content';

export default {
  name: 'app',
  components: {
    Sidebar,
    Content
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      envId: 0,
      menuVisible: false
    };
  },
  computed: {
    env () {
      return this.config.environments[this.envId]
    },
    jsonUrl () {
      return window.location.origin + window.INSOMNIA_URL;
    },
    runInInsomniaLink () {
      return `https://insomnia.rest/run/?label=${encodeURIComponent(this.config.workspace.name)}&uri=${encodeURIComponent(this.jsonUrl)}`;
    },
    logoUrl () {
      return process.env.NODE_ENV === 'demo'
        ? '/insomnia-documenter/logo.png'
        : '/logo.png';
    }
  },
  methods: {
    toggleHamburger () {
      this.menuVisible = !this.menuVisible;
    },
    updateEnvironment (e) {
      this.envId = +(e.currentTarget.value);
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/main';

  header {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #dedede;
    background: #fff;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    height: 60px;
    overflow: hidden;

    .header-left, .header-right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .title {
      padding: 0 10px;
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      display: inline-block;
      vertical-align: middle;
    }

    .hamburger-toggler {
      vertical-align: middle;
      font-size: 22px;
      color: #000;
    }

    .logo {
      display: inline-block;
      vertical-align: middle;
      padding: 0 5px;
      margin-left: 30px;
      width: 48px;
      height: 48px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .environment {
      font-size: 13px;
      padding: 0 30px;
      display: inline-block;
      vertical-align: middle;

      select {
        margin-bottom: 0;
      }
    }

    .run {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .wrapper {
    margin-top: 60px;
  }
</style>
