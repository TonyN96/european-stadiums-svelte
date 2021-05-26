<script>
    import { setContext } from "svelte";
    import { StadiumService } from "./services/stadium-service";

    // Pages
    import Main from "./pages/Main.svelte";
    import Login from "./pages/Login.svelte";
    import Signup from "./pages/Signup.svelte";
    import Home from "./pages/Home.svelte";
    import AddStadium from "./pages/AddStadium.svelte";
    import EditStadium from "./pages/EditStadium.svelte";
    import AdminDashboard from "./pages/AdminDashboard.svelte";
    import Settings from "./pages/Settings.svelte";

    // Components
    import Navigator from "./components/Navigator.svelte";
    import Router from "svelte-spa-router";
    import DeleteStadium from "./components/DeleteStadium.svelte";
    import DeleteUser from "./components/DeleteUser.svelte";
    import Logout from "./components/Logout.svelte";

    setContext("StadiumService", new StadiumService("https://european-stadiums.herokuapp.com"));

    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/home": Home,
        "/add-stadium": AddStadium,
        "/edit-stadium/:id": EditStadium,
        "/delete-stadium/:id": DeleteStadium,
        "/logout": Logout,
        "/settings": Settings,
        "/delete-user/:id": DeleteUser,
        "/admin-dashboard": AdminDashboard,
    };
</script>

<div class="uk-container">
    <Navigator />
    <Router {routes} />
</div>
