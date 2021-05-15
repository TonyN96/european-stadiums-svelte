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

    setContext("StadiumService", new StadiumService("http://localhost:4000"));

    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/home": Home,
        "/add-stadium": AddStadium,
        "/edit-stadium": EditStadium,
        "/logout": Main,
        "/settings": Settings,
        "/admin-dashboard": AdminDashboard,
    };
</script>

<div class="uk-container">
    <Navigator />
    <Router {routes} />
</div>
