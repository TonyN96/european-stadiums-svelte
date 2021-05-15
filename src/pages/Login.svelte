<script>
    import { navBar, welcomeMenu } from "../stores";
    import LoginForm from "../components/LoginForm.svelte";

    navBar.set({
        bar: welcomeMenu,
    });
</script>

<div class="uk-container uk-margin uk-margin-top">
    <div
        class="uk-margin-top uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
        uk-grid
    >
        <div>
            <div>
                <h3 class="uk-text-center">Log in</h3>
                <LoginForm />
            </div>
        </div>
        <div>
            <img
                src="https://res.cloudinary.com/dczqccpne/image/upload/v1615905074/c_383_bfdcd56c-4f2d-4263-bb4f-0a540fcb8bc6_rwwpd0.jpg"
                alt="login-img"
            />
        </div>
    </div>
</div>
