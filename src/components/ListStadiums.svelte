<script>
    export let categorisedStadiums = [];
</script>

{#each categorisedStadiums as category}
    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-medium">
        <h2 class="uk-text-medium uk-text-left uk-margin-remove">
            <span>{category[0].country}</span>
        </h2>
        <p class="uk-text-muted uk-text-right">Count: {category.length}</p>
    </div>
    <div class="uk-child-width-expand uk-grid-width-1-3 uk-margin-large-bottom" uk-grid>
        {#each category as stadium}
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
                    Rating: {#if stadium.rating}{stadium.rating}% {#if stadium.rating >= 50}<i
                                class="fas fa-thumbs-up"
                                style="color: green"
                            />{:else}<i
                                class="fas fa-thumbs-down"
                                style="color: red"
                            />{/if}{:else}None yet{/if}<br />
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
                                style="color: rgba(32, 192, 72, 0.829); font-size: 24px;"
                                title="Reviews"
                                uk-tooltip
                            />
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
                    <hr>
                    {#if stadium.reviews.length > 0}
                        {#each stadium.reviews as review}
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-top">
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
                            <hr>
                        {/each}
                    {:else}
                        <div class="uk-text-medium uk-margin">No reviews yet..</div>
                        <hr>
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
{/each}
