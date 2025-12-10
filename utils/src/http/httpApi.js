import axios from "axios";

let token = "";

if (
  typeof document != "undefined" &&
  localStorage?.getItem("token") != "undefined"
) {
  token = JSON.parse(localStorage?.getItem("token"));
}

const httpApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (token) httpApi.defaults.headers.common["Authorization"] = token;

export default httpApi;
