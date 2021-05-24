<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";
    import { user } from "../stores.js";
    import { get } from "svelte/store";
    const stadiumService = getContext("StadiumService");

    let currentUser = get(user);

    let errorMessage;

    // Image upload feature not incorporated in Svelte version - default image used instead
    let imageUrl =
        "https://res.cloudinary.com/dczqccpne/image/upload/v1621413715/fqp_placeholder_jcy91d.jpg";

    // Porperties of stadium binded to form values
    let newStadium = {
        country: "England",
        name: "",
        city: "",
        capacity: "",
        built: "",
        club: "",
        coords: [],
        imageUrl: imageUrl,
        addedBy: currentUser._id,
    };

    // Function called to add new stadium
    async function addStadium() {
        let success = await stadiumService.addStadium(newStadium);
        // If adding stadium was successful, redirect to home
        // Else reset input fields in form
        if (success) {
            push("/home");
        } else {
            errorMessage = "Error adding stadium";
            newStadium.country = "";
            newStadium.name = "";
            newStadium.city = "";
            newStadium.capacity = "";
            newStadium.built = "";
            newStadium.club = "";
            newStadium.coords = [];
        }
    }
</script>

<form on:submit|preventDefault={addStadium} class="uk-form-stacked uk-text-left">
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-expand">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Name:</label>
                <div class="uk-form-controls">
                    <input
                        bind:value={newStadium.name}
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
                        bind:value={newStadium.city}
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
                        bind:value={newStadium.country}
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
                    bind:value={newStadium.capacity}
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
                    bind:value={newStadium.built}
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
                    bind:value={newStadium.club}
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
                        bind:value={newStadium.coords[0]}
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
                        bind:value={newStadium.coords[1]}
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
                        >Add Stadium</button
                    >
                </div>
            </div>
        </div>
    </div>
    {#if errorMessage}
        {errorMessage}
    {/if}
</form>
