import http from "./httpService";
//import { apiUrl } from "../config.json";

//const apiEndpoint = apiUrl + "/users";
const apiEndpoint = "http://localhost:4000/api/users/";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export function getUser(userId) {
  
}
