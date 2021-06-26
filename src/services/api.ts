import axios from "axios";

// Variável que realiza chamadas para a API mediante ou não de um token de autorização
const Api = (token: string | null) => {
    return axios.create({
        baseURL: process.env.API_BASE_URL,
        ...(token && {headers: {
            Authorization: `Bearer ${token}`
        }})
    })
};

export default Api;
