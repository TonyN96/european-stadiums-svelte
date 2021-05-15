<script>
    import { getContext, onMount } from "svelte";

    const stadiumService = getContext("StadiumService");
    export let country;
    let stadiumList = [];
    onMount(async () => {
        stadiumList = await stadiumService.getStadiumsByCountry(country);
    });
</script>

<div class="uk-flex uk-flex-between uk-flex-middle uk-margin-medium">
    <h2 class="uk-text-medium uk-text-left uk-margin-remove"><span>{country}</span></h2>
    <p class="uk-text-muted uk-text-right">Count: {stadiumList.length}</p>
</div>
<div class="uk-child-width-expand uk-grid-width-1-3 uk-margin-large-bottom" uk-grid>
    {#each stadiumList as stadium}
        <div class="uk-width-1-4">
            <h4 class="uk-title uk-text-medium">{stadium.name}</h4>

            <div uk-lightbox>
                <a href={stadium.imageUrl} data-caption="{stadium.name}, {stadium.city}">
                    <div
                        class="stadium-thumbnail"
                        style="background-image: url('{stadium.imageUrl}');"
                    />
                </a>
            </div>

            <div class="uk-margin uk-width-1-1 uk-text-left uk-text-small">
                City: {stadium.city} <br />
                Capacity: {stadium.capacity} <br />
                Built: {stadium.built} <br />
                Club: {stadium.club} <br />
            </div>

            <div class="uk-width-expand uk-flex uk-flex-between uk-flex-bottom">
                <div class="uk-text-meta">
                    Added by: {stadium.addedBy.firstName}
                    {stadium.addedBy.lastName}
                </div>

                <div>
                    <!-- <div class="uk-inline" style="vertical-align: baseline;" uk-lightbox>
                    <a href="https://www.google.com/maps/embed/v1/place?key={../mapsKey}&q={stadium.coords.[0]},{stadium.coords.[1]}&maptype=satellite"
                        data-caption="{stadium.name}, {stadium.city}" data-type="iframe"><i class="fas fa-map-marker-alt"
                            style="color: rgba(49, 216, 57, 0.829); font-size: 24px;" title="View on map"
                            uk-tooltip></i></a>
                </div> -->

                    <div
                        class="uk-inline"
                        uk-toggle="target: #delete-modal-{stadium._id}"
                        style="cursor: pointer; vertical-align: baseline;"
                    >
                        <i
                            class="fas fa-times-circle"
                            style="color: rgba(235, 38, 38, 0.829); font-size: 24px;"
                            title="Delete"
                            uk-tooltip
                        />
                    </div>
                    <a href="/edit-stadium/{stadium._id}"
                        ><i
                            class="fas fa-edit"
                            style="color: rgba(50, 137, 219, 0.829); font-size: 24px;"
                            title="Edit"
                            uk-tooltip
                        /></a
                    >
                </div>
            </div>
        </div>

        <div id="delete-modal-{stadium._id}" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Delete {stadium.name}</h2>
                <p>Are you sure you want to delete this stadium?</p>
                <p class="uk-text-center">
                    <button class="uk-button uk-button-default uk-modal-close" type="button"
                        >Cancel</button
                    >
                    <a href="delete-stadium/{stadium._id}"
                        ><button
                            class="uk-button"
                            style="background-color: red; color: white;"
                            type="button">Delete</button
                        ></a
                    >
                </p>
            </div>
        </div>
    {/each}
</div>
