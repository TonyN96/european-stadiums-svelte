<script>
    import { push } from "svelte-spa-router";
    import { getContext, onMount } from "svelte";
    const stadiumService = getContext("StadiumService");
    export let stadiumId;

    let errorMessage;
    // Properties of stadium binded to edit stadium form
    let newDetails = {
        country: "",
        name: "",
        city: "",
        capacity: "",
        built: "",
        club: "",
        coords: [],
        imageUrl: "",
    }

    // Function used to set default form values to staidums existing details
    async function setDefaultValues() {
        let stadium = await stadiumService.findOneStadium(stadiumId);
        newDetails.country = stadium.country;
        newDetails.name = stadium.name;
        newDetails.city = stadium.city;
        newDetails.capacity = stadium.capacity;
        newDetails.built = stadium.built;
        newDetails.club = stadium.club;
        newDetails.coords = stadium.coords;
        newDetails.imageUrl = stadium.imageUrl;
    }

    // Default values set on page load
    onMount(async () => {
        setDefaultValues();
    });

    // Function called to edit a stadium
    async function editStadium() {
        let success = await stadiumService.editStadium(stadiumId, newDetails);
        // If stadium was edited successfully, redirect to home
        // Else reset values to default and inform the user of error
        if (success) {
            push("/home");
        } else {
            errorMessage = "Error editing stadium";
            setDefaultValues();
        }
    }
</script>

<div class="uk-margin uk-width-expand uk-margin-auto">
    <h3 class="uk-text-center">Edit Stadium - {newDetails.name}</h3>
    <form on:submit|preventDefault={editStadium} class="uk-form-stacked uk-text-left">
        <div class="uk-grid uk-grid-stack">
            <div class="uk-width-expand">
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Name:</label>
                    <div class="uk-form-controls">
                        <input
                            bind:value={newDetails.name}
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            name="name"
                            placeholder="e.g. Nou Camp"
                        />
                    </div>
                </div>
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-2@s">
                        <div class="uk-form-label">City:</div>
                        <input
                            bind:value={newDetails.city}
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            name="city"
                            placeholder="e.g. Barcelona"
                        />
                    </div>
                    <div class="uk-width-1-2@s">
                        <div class="uk-form-label">Country:</div>
                        <select
                            bind:value={newDetails.country}
                            class="uk-select"
                            id="form-stacked-text"
                            name="country"
                        >
                            <option value="England">England</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                        </select>
                    </div>
                </div>
                <div class="uk-margin">
                    <div class="uk-form-label">Capacity:</div>
                    <input
                        bind:value={newDetails.capacity}
                        class="uk-input"
                        id="form-stacked-text"
                        type="number"
                        name="capacity"
                        placeholder="e.g. 99354"
                    />
                </div>
                <div class="uk-margin">
                    <div class="uk-form-label">Year built:</div>
                    <input
                        bind:value={newDetails.built}
                        class="uk-input"
                        id="form-stacked-text"
                        type="number"
                        name="built"
                        placeholder="e.g. 1957"
                    />
                </div>
                <div class="uk-margin">
                    <div class="uk-form-label">Club:</div>
                    <input
                        bind:value={newDetails.club}
                        class="uk-input"
                        id="form-stacked-text"
                        type="name"
                        name="club"
                        placeholder="e.g. FC Barcelona"
                    />
                </div>
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-2@s">
                        <div class="uk-form-label">X co-ordinate:</div>
                        <input
                            bind:value={newDetails.coords[0]}
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            name="xcoord"
                            placeholder="e.g. 41.381024762375205"
                        />
                    </div>
                    <div class="uk-width-1-2@s">
                        <div class="uk-form-label">Y co-ordinate:</div>
                        <input
                            bind:value={newDetails.coords[1]}
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            name="ycoord"
                            placeholder="e.g. 2.122776888754896"
                        />
                    </div>
                </div>
                <div class="uk-width-1 uk-margin">
                    <div class="uk-margin">
                        <button
                            class="submit uk-button uk-button-secondary uk-button-large uk-width-1-1"
                            >Edit Stadium</button
                        >
                    </div>
                </div>
            </div>
        </div>
        {#if errorMessage}
            {errorMessage}
        {/if}
    </form>
</div>
