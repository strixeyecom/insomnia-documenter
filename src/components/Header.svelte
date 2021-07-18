<script>
    export let toggleHamburger;
    export let exampleVisible;
    export let toggleExample;
</script>

<header>
    <div class="header-left">
        <a
            href={'#'}
            class="hamburger-toggler"
            on:click={toggleHamburger}
        >
            <i class="fa fa-bars" aria-hidden="true" />
        </a>

        <a href="/" class="logo">
            <img src="logo.png" alt="Homepage"/>
        </a>
    </div>
    <div class="header-right">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            href={'#'}
            class="example-toggler"
            class:inactive={!exampleVisible}
            on:click={toggleExample}
            title="Toggle request examples"
        >
            <i class="fa fa-code" aria-hidden="true" />
        </a>
    </div>
</header>
