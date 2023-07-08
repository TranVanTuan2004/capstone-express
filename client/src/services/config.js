import axios from "axios";
import { BASE_URL } from "../utils/configs";
import { localUser } from "../utils/localUser";

export const configHeaders = () => {
    return {
        token: localStorage.getItem("token")
    }
}


export const https = axios.create({
    baseURL: BASE_URL,
    headers: configHeaders()
})