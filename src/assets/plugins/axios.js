import axios from "axios";
import Cookie from "@/service/cookie";

export const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: Cookie.getToken(),
  },
};

export const $axios = axios.create({
  baseURL: "http://localhost/api",
});
