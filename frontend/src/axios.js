import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8000",
    headers:{
        "Content-Type": "application/json",
    },
});



export const LogAPI = axios.create({
    baseURL: "http://localhost:8000",
    headers:{
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("user")}`
    },
});