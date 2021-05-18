import axios from "axios";
import { user } from "../stores.js";

export class StadiumService {
    stadiumList = [];
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /* User services */

    async loginUser(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/login`, {
                email,
                password,
            });
            user.set(response.data);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }

    async signupUser(firstName, lastName, email, password) {
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

    /* Stadium services */

    async findOneStadium(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/" + id);
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async findAllStadiums() {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums");
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async findStadiumByCountry(country) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/country/" + country);
            this.stadiumList = response.data;
            return this.stadiumList;
        } catch (error) {
            return [];
        }
    }

    async addStadium(stadium) {
        try {
            const response = await axios.post(this.baseUrl + "/api/stadiums", stadium);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async uploadStadiumImage(imageFile) {
        try {
            const response = await axios.post(this.baseUrl + "/api/stadiums/image", imageFile);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async editStadium(id, stadium) {
        try {
            const updatedStadium = {
                name: stadium.name,
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

    async deleteOneStadium(id) {}

    async deleteAllStadiums() {}
}
