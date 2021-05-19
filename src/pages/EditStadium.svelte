<script>
    import EditStadiumForm from "../components/EditStadiumForm.svelte";
    import { navBar, mainMenu } from "../stores";
    export let params = {};
    let stadiumId = params.id;

    navBar.set({
        bar: mainMenu,
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-width-expand uk-flex-center uk-flex-middle uk-text-center uk-grid uk-margin-top">
        <div class="uk-width-expand">
            <img
                width="500"
                src="https://res.cloudinary.com/dczqccpne/image/upload/v1615905237/1562_m4nnui.jpg"
                alt="edit-stadium-img"
            />
        </div>
        <EditStadiumForm {stadiumId} />
    </div>
</div>
