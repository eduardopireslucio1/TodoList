import { createRouter, createWebHistory } from "vue-router";
import Default from "../layouts/Default";
import Auth from "../layouts/Auth";
import Login from "../views/LoginView";
import Register from "../views/RegisterView";
import VerifyEmail from "../views/VerifyEmail";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";
import Home from "../views/Home";
import Guard from "../service/middleware";

const routes = [
  {
    path: "/",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: Default,
    children: [
      {
        path: "",
        name: "index",
        component: Home,
      },
    ],
  },
  {
    path: "/login",
    beforeEnter: Guard.redirectIfAuthenticated,
    component: Auth,
    children: [
      {
        path: "",
        name: "login",
        component: Login,
      },
    ],
  },
  {
    path: "/register",
    component: Auth,
    children: [
      {
        path: "",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: "/verificar-email",
    component: Auth,
    children: [
      {
        path: "",
        name: "VerifyEmail",
        component: VerifyEmail,
      },
    ],
  },
  {
    path: "/esqueci-senha",
    component: Auth,
    children: [
      {
        path: "",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/recuperar-senha",
    component: Auth,
    children: [
      {
        path: "",
        name: "ResetPassword",
        component: ResetPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
