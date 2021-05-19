<script>
    import { push } from "svelte-spa-router";
    import { getContext, onMount } from "svelte";
    const stadiumService = getContext("StadiumService");
    export let params = {};
    let stadiumId = params.id;

    onMount(async () => {
        await stadiumService.deleteOneStadium(stadiumId);
        push("/home");
    });
</script>
