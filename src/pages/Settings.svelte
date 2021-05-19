<script>
    import { navBar, mainMenu } from "../stores";
    import SettingsForm from "../components/SettingsForm.svelte";

    navBar.set({
        bar: mainMenu,
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div class="uk-width-1-2">
            <img
                src="https://res.cloudinary.com/dczqccpne/image/upload/v1615905509/france-denmark-football-soccer_bpjcwj.jpg"
                alt="settings-img"
            />
        </div>
        <div class="uk-width-1-2">
            <h3 class="uk-text-center">Edit Your Details</h3>
            <SettingsForm />
        </div>
    </div>
</div>
