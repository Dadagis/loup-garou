import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "http://localhost:4000/api";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint + "/auth", { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const {data: user} = await http.get(apiEndpoint+ "/users/" + jwtDecode(jwt)._id);
    if(user.id != null){
      return user;
    }
    else{
      return user;
    }
  } catch (ex) {
    return null;
  }
}
export function isAuthenticated() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  isAuthenticated,
};
