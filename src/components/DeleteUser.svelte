<script>
    import { push } from "svelte-spa-router";
    import { getContext, onMount } from "svelte";
    import { user } from "../stores.js";
    const stadiumService = getContext("StadiumService");
    export let params = {};
    let userId = params.id;

    let currentUser;
    user.subscribe((value) => {
        currentUser = value;
    });

    // @ts-ignore
    let currentUserId = currentUser._id;

    onMount(async () => {
        await stadiumService.deleteOneUser(userId);
        // If deleted was the current user, redirect to landing page
        // Else redirect to admin dashboard as user must have been an admin
        if (userId == currentUserId) {
            push("/");
        } else {
            push("/admin-dashboard");
        }
    });
</script>
