import axios from "axios";

export const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const $axios = axios.create({
  baseURL: "http://localhost/api",
});
