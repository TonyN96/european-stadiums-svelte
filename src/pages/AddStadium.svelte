<script>
    import { navBar, mainMenu } from "../stores";
    import AddStadiumForm from "../components/AddStadiumForm.svelte";

    navBar.set({
        bar: mainMenu,
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-width-expand uk-flex-center uk-flex-middle uk-text-center uk-grid uk-margin-top">
        <div class="uk-width-expand">
            <img
                width="500"
                src="https://res.cloudinary.com/dczqccpne/image/upload/v1615905198/1444707d-686c-4dbf-8d98-987694b704c0_ddw88z.jpg"
                alt="add-stadium-img"
            />
        </div>
        <div class="uk-margin uk-width-expand uk-margin-auto">
            <h3 class="uk-text-center">Add Stadium</h3>
            <AddStadiumForm />
        </div>
    </div>
</div>
