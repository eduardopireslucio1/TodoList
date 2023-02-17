import Cookie from "@/service/cookie";
import { $axios, config } from "@/assets/plugins/axios";
import store from "@/store";

export default {
  redirectIfAuthenticated(to, from, next) {
    Cookie.getToken() ? next({ name: "index" }) : next();
  },
  async redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.getToken();

    if (!token) {
      next({ name: "login" });
    }

    config.headers["Authorization"] = token;

    await $axios
      .get("v1/me", config)
      .then((response) => {
        if (!store.state.user.id) {
          store.commit("user/STORE_USER", response.data.data);
        }
      })
      .catch(() => {
        Cookie.deleteToken();
        next({ name: "login" });
      });

    next();
  },
};
