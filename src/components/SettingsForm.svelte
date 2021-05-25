<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";
    import { user } from "../stores.js";
    import { get } from "svelte/store";
    const stadiumService = getContext("StadiumService");

    let currentUser = get(user);
    let userId = currentUser._id;
    let newDetails = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
        admin: currentUser.admin
    }
    let errorMessage = "";

    async function updateSettings() {
        let success = await stadiumService.editUser(currentUser._id, newDetails);
        // If updating of details is successful, redirect to home
        // Else reset the form fields and inform the user of error
        if (success) {
            push("/home");
        } else {
            newDetails.firstName = currentUser._id;
            newDetails.lastName = currentUser.firstName;
            newDetails.email = currentUser.lastName;
            newDetails.password = "";
            errorMessage = "Error updating details";
        }
    }
</script>

<form on:submit|preventDefault={updateSettings}>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user" />
            <input
                bind:value={newDetails.firstName}
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
                bind:value={newDetails.lastName}
                class="uk-input uk-form-large"
                type="text"
                name="lastName"
            />
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail" />
            <input bind:value={newDetails.email} class="uk-input uk-form-large" type="text" name="email" />
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock" />
            <input
                bind:value={newDetails.password}
                class="uk-input uk-form-large"
                type="password"
                name="password"
            />
        </div>
    </div>
    <div class="uk-margin">
        <button class="uk-button uk-button-secondary uk-button-large uk-width-1-1">Save</button>
    </div>
</form>

<button
    class="uk-button uk-button-large uk-width-1-1"
    type="button"
    uk-toggle="target: #delete-modal"
    style="background-color: red; color: white;">Delete Account</button
>

{#if currentUser.admin}
    <a href="#/admin-dashboard">
        <button
            class="uk-button uk-button-large uk-width-1-1 uk-background-primary uk-margin-top"
            type="button"
            style="color: white;">Admin Dashboard</button
        >
    </a>
{/if}

<div id="delete-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <p class="uk-text-center">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <a href="#/delete-user/{userId}"
                ><button
                    class="uk-button"
                    style="background-color: red; color: white;"
                    type="button">Delete</button
                ></a
            >
        </p>
    </div>
</div>

{#if errorMessage}
    {errorMessage}
{/if}
