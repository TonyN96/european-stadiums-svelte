<script>
    import { push } from "svelte-spa-router";
    import { getContext, onMount } from "svelte";
    const stadiumService = getContext("StadiumService");

    onMount(async () => {
        const result = await stadiumService.logout();
        if (result) {
            push("/");
        } else {
            push("/home")
        }
    });
</script>
