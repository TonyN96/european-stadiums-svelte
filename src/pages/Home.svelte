<script>
    import { getContext, onMount } from "svelte";
    import ListStadiums from "../components/ListStadiums.svelte";
    import { get } from "svelte/store";
    import { navBar, mainMenu, stadiums } from "../stores";
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-maps";
    const stadiumService = getContext("StadiumService");

    navBar.set({
        bar: mainMenu,
    });

    let categorisedStadiums;
    let stadiumsCount;
    let usersCount;
    let map;

    async function categoriseStadiums(stadiums) {
        let countries = ["England", "France", "Germany", "Italy", "Spain"];
        let result = [];
        for (let x = 0; x < countries.length; x++) {
            let array = [];
            for (let y = 0; y < stadiums.length; y++) {
                if (stadiums[y].country == countries[x]) {
                    array.push(stadiums[y]);
                }
            }
            result.push(array);
        }
        return result;
    }

    onMount(async () => {
        let allUsers = await stadiumService.findAllUsers();
        let allStadiums = await stadiumService.findAllStadiums();
        for (let x = 0; x < allStadiums.length; x++) {
            allStadiums[x].reviews = await stadiumService.findReviewsByStadium(allStadiums[x]._id);
            // Populate rating for each stadium using external stadiumService function
            let totalRatings = 0;
            for (let y = 0; y < allStadiums[x].reviews.length; y++) {
                totalRatings += allStadiums[x].reviews[y].rating;
                // Create new date object for each stadium review
                let reviewDate = new Date(allStadiums[x].reviews[y].date);
                // Format each date object in each stadium review
                let reviewDateStr =
                    ("0" + reviewDate.getDate()).slice(-2) +
                    "-" +
                    ("0" + (reviewDate.getMonth() + 1)).slice(-2) +
                    "-" +
                    reviewDate.getFullYear();
                // Set the review date to the formatted date string
                allStadiums[x].reviews[y].date = reviewDateStr;
            }
            if (totalRatings != 0) {
                let rating = totalRatings / allStadiums[x].reviews.length;
                allStadiums[x].rating = rating.toFixed(2);
            }
        }
        stadiums.set(allStadiums);

        let categoriseResult = await categoriseStadiums(allStadiums);
        categorisedStadiums = categoriseResult;

        const mapConfig = {
            location: { lat: 48.630117, lng: 5.607379 },
            zoom: 4,
            minZoom: 0,
        };
        map = new LeafletMap("stadium-map", mapConfig, "Terrain");
        map.showZoomControl();
        for (let x = 0; x < allStadiums.length; x++) {
            map.addMarker(
                { lat: allStadiums[x].coords[0], lng: allStadiums[x].coords[1] },
                allStadiums[x].name +
                    "<br>" +
                    allStadiums[x].city +
                    ", " +
                    allStadiums[x].country +
                    '<br><br><img src= "' +
                    allStadiums[x].imageUrl +
                    '">'
            );
        }

        usersCount = allUsers.length;
        stadiumsCount = allStadiums.length;
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-width-expand uk-flex-center uk-flex-middle uk-text-center uk-margin-top">
        <div class=" uk-width-expand">
            <div class="uk-margin">
                <p class="uk-text-medium uk-text-center uk-width-1-2 uk-margin-auto">
                    Welcome to the European Stadiums web app. This app is designed to store and
                    display a database of football stadiums from the top five European leagues.
                    These leagues are based in England, France, Germany, Italy and Spain. You can
                    add new stadiums or update/remove existing stadiums.
                </p>

                <p class="uk-inline uk-text-muted uk-margin-right uk-margin-remove-top">
                    Stadiums: {stadiumsCount}
                </p>
                <p class="uk-inline uk-text-muted uk-margin-left uk-margin-remove-top">
                    Users: {usersCount}
                </p>

                <div
                    class="uk-width-expand uk-margin-large-bottom uk-margin-small-top uk-text-center"
                >
                    <a href="#/add-stadium">
                        <button class="uk-button uk-button-secondary">Add Stadium</button>
                    </a>
                </div>
            </div>

            <div id="stadium-map" class="ui embed" style="height:400px" />

            <ListStadiums {categorisedStadiums} />
        </div>
    </div>
</div>
