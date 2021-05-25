import { writable } from "svelte-local-storage-store";

export let welcomeMenu = [
    {
        title: "Signup",
        icon: "fas fa-user-plus fa-3x",
        colour: "light-gray",
        link: "/#/signup",
    },
    {
        title: "Login",
        icon: "fas fa-sign-in-alt fa-3x",
        colour: "light-gray",
        link: "/#/login",
    },
];

export const mainMenu = [
    {
        title: "Source Repo",
        icon: "fab fa-github fa-3x",
        colour: "light-gray",
        link: "https://github.com/TonyN96/european-stadiums",
    },
    {
        title: "Home",
        icon: "fas fa-home fa-3x",
        colour: "light-gray",
        link: "/#/home",
    },
    {
        title: "Settings",
        icon: "fas fa-user-circle fa-3x",
        colour: "light-gray",
        link: "/#/settings",
    },
    {
        title: "Sign Out",
        icon: "fas fa-sign-out-alt fa-3x",
        colour: "light-gray",
        link: "/#/logout",
    },
];

export const user = writable("user", {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: false,
});

export const stadiums = writable("stadiums", []);

export const navBar = writable("navBar", {
    bar: [],
});
