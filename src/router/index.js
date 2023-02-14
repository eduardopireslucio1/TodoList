import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView";
import Register from "../views/RegisterView";

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
