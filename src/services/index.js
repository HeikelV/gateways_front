import axios from 'axios';

const APIUrl = import.meta.env.VITE_BASE_SERVER_URL;
const axiosBase = axios.create({
    baseURL: APIUrl,
    headers: {
        "Content-type": "application/json",
    }
});

export { axiosBase };