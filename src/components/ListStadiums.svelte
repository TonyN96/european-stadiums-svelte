<script>
    import { getContext, onMount } from "svelte";
    export let country;
    const stadiumService = getContext("StadiumService");
    let mapsKey;
    let stadiumList = [];

    onMount(async () => {
        mapsKey = await stadiumService.getMapsKey();
        stadiumList = await stadiumService.findStadiumByCountry(country);
        for (let x = 0; x < stadiumList.length; x++) {
            stadiumList[x].reviews = await stadiumService.findReviewsByStadium(stadiumList[x]._id);
            stadiumList[x].rating = await stadiumService.getStadiumRating(stadiumList[x]._id);
            for (let y = 0; y < stadiumList.length; y++) {
                let reviewDate = new Date(stadiumList[x].reviews[y].date);
                let reviewDateStr =
                    ("0" + reviewDate.getDate()).slice(-2) +
                    "-" +
                    ("0" + (reviewDate.getMonth() + 1)).slice(-2) +
                    "-" +
                    reviewDate.getFullYear();
                stadiumList[x].reviews[y].date = reviewDateStr;
            }
        }
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
                Rating: {#if stadium.rating}{stadium.rating}/5{:else}None yet{/if}<br />
            </div>

            <div class="uk-width-expand uk-flex uk-flex-between uk-flex-bottom">
                <div class="uk-text-meta">
                    Added by: {stadium.addedBy.firstName}
                    {stadium.addedBy.lastName}
                </div>

                <div>
                    <div
                        class="uk-inline"
                        uk-toggle="target: #reviews-modal-{stadium._id}"
                        style="cursor: pointer; vertical-align: baseline;"
                    >
                        <i
                            class="fas fa-file"
                            style="color: rgba(230, 176, 28, 0.829); font-size: 24px;"
                            title="Reviews"
                            uk-tooltip
                        />
                    </div>

                    <div class="uk-inline" style="vertical-align: baseline;" uk-lightbox>
                        <a
                            href="https://www.google.com/maps/embed/v1/place?key={mapsKey}&q={stadium
                                .coords[0]},{stadium.coords[1]}&maptype=satellite"
                            data-caption="{stadium.name}, {stadium.city}"
                            data-type="iframe"
                            ><i
                                class="fas fa-map-marker-alt"
                                style="color: rgba(49, 216, 57, 0.829); font-size: 24px;"
                                title="View on map"
                                uk-tooltip
                            /></a
                        >
                    </div>

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
                    <a href="#/edit-stadium/{stadium._id}"
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

        <div id="reviews-modal-{stadium._id}" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">{stadium.name} Reviews</h2>
                {#if stadium.reviews}
                    {#each stadium.reviews as review}
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-medium-top">
                            <div class="uk-text-large">{review.title}</div>
                            <div class="uk-text-medium">
                                {review.reviewedBy.firstName}
                                {review.reviewedBy.lastName}
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-between uk-flex-middle">
                            <div class="uk-text-medium">Rating: {review.rating}/5</div>
                            <div class="uk-text-small">{review.date}</div>
                        </div>
                        <div class="uk-margin">
                            {review.review}
                        </div>
                    {/each}
                {:else}
                    <div class="uk-text-medium uk-margin-top">No reviews yet..</div>
                {/if}
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
                    <a href="#/delete-stadium/{stadium._id}"
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
