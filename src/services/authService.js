//import { apiBaseUrl } from '../config.json';
import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth"
const tokenKey = "token"

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, {
        "email": email,
        "password": password,
    })
    localStorage.setItem(tokenKey, jwt)
}

export async function loginWithJWT(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

export function getJWT() {
    // try {
    return localStorage.getItem(tokenKey)
    // }catch (ex) { return null}
}

http.setJWT(getJWT())

export function getCurrentUser() {
    try {
        console.log("getCurrentUser")
        const jwt = localStorage.getItem(tokenKey);
        console.log("jwt" + jwt)

        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}



export function logout() {
    localStorage.removeItem(tokenKey)
}