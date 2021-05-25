import axios from "axios";
import { user } from "../stores.js";

export class StadiumService {
    stadiumList = [];
    reviewsList = [];
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        if (localStorage.stadium) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + JSON.parse(localStorage.stadium);
        }
    }

    /* User services */

    async authenticate(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
                email,
                password,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            user.set(response.data.user);
            localStorage.token = JSON.stringify(response.data.token);
            return response.status == 201;
        } catch (error) {
            return false;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users`, newUser);
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            user.set(response.data.user);
            localStorage.token = JSON.stringify(response.data.token);
            return response;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        try {
            user.set({
                _id: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: false,
            });
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.token = null;
            return true;
        } catch (error) {
            return false;
        }
    }

    async editUser(userId, newDetails) {
        try {
            const response = await axios.post(this.baseUrl + "/api/users/" + userId, newDetails);
            user.set(response.data.user);
            return response;
        } catch (error) {
            return false;
        }
    }

    async getUserNameById(userId) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/name/" + userId);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async findAllUsers() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users");
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async deleteOneUser(userId) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users/" + userId);
            return response.data;
        } catch (error) {
            return null;
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
            return response.status == 201;
        } catch (error) {
            return false;
        }
    }

    async getMapsKey() {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/mapsKey");
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async deleteOneStadium(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/stadiums/" + id);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    /* Review services */

    async findAllReviews() {
        try {
            const response = await axios.get(this.baseUrl + "/api/reviews");
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async addReview(review) {
        try {
            const response = await axios.post(this.baseUrl + "/api/reviews", review);
            return response.status == 201;
        } catch (error) {
            return null;
        }
    }

    async findReviewsByStadium(stadiumId) {
        try {
            const response = await axios.get(this.baseUrl + "/api/reviews/" + stadiumId);
            this.reviewsList = response.data;
            return this.reviewsList;
        } catch (error) {
            return [];
        }
    }

    async getStadiumRating(stadiumId) {
        try {
            const response = await axios.get(this.baseUrl + "/api/stadiums/rating/" + stadiumId);
            return response.data;
        } catch (error) {
            return null;
        }
    }
}
