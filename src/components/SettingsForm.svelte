<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";
    import { user } from "../stores.js";
    const stadiumService = getContext("StadiumService");

    let currentUser;
    user.subscribe((value) => {
        currentUser = value;
    });

    // @ts-ignore
    let firstName = currentUser.firstName;
    // @ts-ignore
    let lastName = currentUser.lastName;
    // @ts-ignore
    let email = currentUser.email;
    let password = "";
    // @ts-ignore
    let admin = currentUser.admin;
    let errorMessage = "";

    async function updateSettings() {
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            admin: admin,
        };
        let success = await stadiumService.editUser(currentUser._id, newUser);
        if (success) {
            push("/home");
        } else {
            firstName = "";
            lastName = "";
            email = "";
            password = "";
            admin = "";
            errorMessage = "Error updating details";
        }
    }
</script>

<form on:submit|preventDefault={updateSettings}>
    <div class="uk-margin">
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
    <div class="uk-margin">
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
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail" />
            <input bind:value={email} class="uk-input uk-form-large" type="text" name="email" />
        </div>
    </div>
    <div class="uk-margin">
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
        <button class="uk-button uk-button-secondary uk-button-large uk-width-1-1">Save</button>
    </div>
    {#if errorMessage}
        {errorMessage}
    {/if}
</form>
