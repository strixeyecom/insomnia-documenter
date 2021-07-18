<script>
    export let toggleHamburger;
    export let exampleVisible;
    export let toggleExample;
</script>

<header>
    <div class="header-left">
        <a
            href="javascript:"
            class="hamburger-toggler"
            on:click={toggleHamburger}
        >
            <i class="fa fa-bars" aria-hidden="true" />
        </a>

        <a href="/" class="logo">
            <img src="logo.png" />
        </a>
    </div>
    <div class="header-right">
        <a
            href="javascript:;"
            class="example-toggler"
            class:inactive={!exampleVisible}
            on:click={toggleExample}
            title="Toggle request examples"
        >
            <i class="fa fa-code" aria-hidden="true" />
        </a>
    </div>
</header>
