<script>
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Content from "./components/Content.svelte";
  import applyEnvForObject from "./lib/applyEnvForObject";

  export let config;

  let envId = 0;
  $: env = config.environments[envId];
  $: requests = applyEnvForObject(config.requests, config.environments[envId]);
  $: groups = applyEnvForObject(config.groups, config.environments[envId]);

  let menuVisible = false;
  let exampleVisible =
    (localStorage.getItem("show-examples") || "true") === "true";

  function toggleHamburger() {
    menuVisible = !menuVisible;
  }

  function toggleExample() {
    exampleVisible = !exampleVisible;
    localStorage.setItem("show-examples", exampleVisible);
  }
</script>

<svelte:head>
  <title>{config.workspace.name}</title>
</svelte:head>

<Header {toggleHamburger} {toggleExample} {exampleVisible} />

<section class="wrapper" class:hide-right={!exampleVisible}>
  <Sidebar
    {requests}
    {groups}
    workspace={config.workspace}
    visible={menuVisible}
  />
  <Content
    {requests}
    {groups}
    workspace={config.workspace}
    cookiejars={config.cookiejars}
    {env}
  />
</section>

<style type="text/scss" global>
  @import "./styles/main";
</style>
