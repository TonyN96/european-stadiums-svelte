import axios from "axios";
import { user } from "../stores.js";

export class StadiumService {
    stadiumList = [];
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getStadium(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/" + id);
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async getAllStadiums() {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums");
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async getStadiumsByCountry(country) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/country/" + country);
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async getStadiumLocation(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/location/" + id);
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async addStadium(stadium) {
        try {
            const newStadium = {
                name: stadium.amount,
                country: stadium.country,
                city: stadium.city,
                capacity: stadium.capacity,
                built: stadium.built,
                club: stadium.club,
                coords: stadium.coords,
            };
            const response = await axios.post(this.baseUrl + "/api/stadiums/", newStadium);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }

    async editStadium(id, stadium) {
        try {
            const updatedStadium = {
                name: stadium.amount,
                country: stadium.country,
                city: stadium.city,
                capacity: stadium.capacity,
                built: stadium.built,
                club: stadium.club,
                coords: stadium.coords,
            };
            const response = await axios.post(this.baseUrl + "/api/stadiums/" + id, updatedStadium);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
                email,
                password,
            });
            user.set(response.data);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }

    async signup(firstName, lastName, email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/signup`, {
                firstName,
                lastName,
                email,
                password,
            });
            user.set(response.data);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }
}
