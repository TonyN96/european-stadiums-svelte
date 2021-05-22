# European Stadiums Svelte

A single page Svelte application which displays a database of football stadiums from the top five European leagues.

These leagues are based in:

- England
- France
- Germany
- Italy
- Spain

## Features

- View stadium data and images
- View stadium location on map
- Add stadiums
- Edit existing stadiums
- Remove existing stadiums
- View reviews on Stadiums
- Edit/delete user account

This app is based on the server-rendered version of the app and makes use of it's API.

## Technologies

- HTML, JavaScript, CSS
- Svelte
- [UIKit](https://getuikit.com/)
- [svelte-spa-router](https://www.npmjs.com/package/svelte-spa-router)

## Usage

Having access to the API from the [server-rendered version](https://github.com/TonyN96/european-stadiums) of this app is a prerequisite.

```
# Clone the repository:
$ git clone https://github.com/TonyN96/european-stadiums-svelte.git

# Go into the repository
$ cd european-stadiums-svelte

# Install dependencies
$ npm install
```

Ensure that StadiumService in App.svelte is set to listen on an appropriate port that gives access to the API.

```
# Run the app
$ npm start
```

![Screenshot](public/screenshot.png)