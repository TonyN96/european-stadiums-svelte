<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";
    const stadiumService = getContext("StadiumService");

    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let errorMessage = "";

    async function signup() {
        let success = await stadiumService.signup(firstName, lastName, email, password);
        if (success) {
            push("/home");
        } else {
            firstName = "";
            lastName = "";
            email = "";
            password = "";
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
                bind:value={firstName}
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
                bind:value={lastName}
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
            <input bind:value={email} class="uk-input uk-form-large" type="text" name="email" />
        </div>
    </div>
    <div class="uk-margin uk-text-left">
        <label class="uk-form-label" for="form-stacked-text">Password:</label>
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock" />
            <input
                bind:value={password}
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
