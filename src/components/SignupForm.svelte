<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";
    const stadiumService = getContext("StadiumService");

    let newUser = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        admin: false,
    };
    let errorMessage = "";

    async function signup() {
        let success = await stadiumService.createUser(newUser);
        if (success) {
            push("/home");
        } else {
            newUser.firstName = "";
            newUser.lastName = "";
            newUser.email = "";
            newUser.password = "";
            errorMessage = "Invalid Credentials";
        }
    }
</script>

<form on:submit|preventDefault={signup}>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">First Name:</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user" />
            <input
                bind:value={newUser.firstName}
                class="uk-input uk-form-large"
                type="text"
                name="firstName"
            />
        </div>
    </div>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">Last Name:</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user" />
            <input
                bind:value={newUser.lastName}
                class="uk-input uk-form-large"
                type="text"
                name="lastName"
            />
        </div>
    </div>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">Email:</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail" />
            <input
                bind:value={newUser.email}
                class="uk-input uk-form-large"
                type="text"
                name="email"
            />
        </div>
    </div>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">Password:</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock" />
            <input
                bind:value={newUser.password}
                class="uk-input uk-form-large"
                type="password"
                name="password"
            />
        </div>
    </div>
    <div class="uk-margin">
        <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Sign up</button>
    </div>
    {#if errorMessage}
        {errorMessage}
    {/if}
</form>
