<script>
    import { navBar } from "../stores";
    import { user } from "../stores.js";

    let currentUser;

    user.subscribe(value => {
        currentUser = value;
    })
</script>

<nav class="uk-navbar uk-padding-small uk-container" uk-navbar>
    <div class="uk-navbar-left">
        <div class="uk-text-left uk-text-large">
            <a href="/" class="uk-link-heading">
                <i class="fas fa-futbol" /> European Stadiums
            </a>
        </div>
    </div>

    <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
            {#if currentUser}
                <li class="user-custom-style uk-text-muted">
                    <div>{currentUser.firstName} {currentUser.lastName}</div>
                </li>
            {/if}
            <!-- Each loop which populates the nav bar with navBar from stores -->
            {#each $navBar.bar as nav}
                <li>
                    <a href={nav.link}>
                        <i class={nav.icon} style="color:{nav.colour}" uk-tooltip={nav.title} />
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</nav>
