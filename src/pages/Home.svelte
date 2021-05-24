<script>
    import { getContext, onMount } from "svelte";
    import ListStadiums from "../components/ListStadiums.svelte";
    import { navBar, mainMenu } from "../stores";
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-maps";
    const stadiumService = getContext("StadiumService");

    navBar.set({
        bar: mainMenu,
    });

    let stadiumsCount;
    let usersCount;
    let map;

    onMount(async () => {
        let allStadiums = await stadiumService.findAllStadiums();
        let allUsers = await stadiumService.findAllUsers();

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

            <ListStadiums country="England" />
            <ListStadiums country="France" />
            <ListStadiums country="Germany" />
            <ListStadiums country="Italy" />
            <ListStadiums country="Spain" />
        </div>
    </div>
</div>
