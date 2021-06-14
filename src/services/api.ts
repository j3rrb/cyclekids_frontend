import axios from "axios";

const Api = (token: string | null) => {
    return axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

export default Api;
