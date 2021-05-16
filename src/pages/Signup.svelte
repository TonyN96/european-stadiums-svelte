<script>
    import { navBar, welcomeMenu } from "../stores";
    import SignupForm from "../components/SignupForm.svelte";

    navBar.set({
        bar: welcomeMenu,
    });
</script>

<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div>
            <h3 class="uk-text-center">Sign Up</h3>
            <SignupForm />
        </div>
        <div>
            <img
                src="https://res.cloudinary.com/dczqccpne/image/upload/v1615905052/5c5461ca579bbada71dbb7b9bd1b6710_lrpiws.jpg"
                alt="signup-img"
            />
        </div>
    </div>
</div>
