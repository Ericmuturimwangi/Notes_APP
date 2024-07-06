import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL //imports anything that specifies an enviroment variable file

})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = ` Bearer ${token}` //this is how to pass JWT auth access token; create an auth header starting with bearer, space and the token

        }
        return config
    },
    (error)=>{
        return Promise.reject(error)

    }
)

export default api;
