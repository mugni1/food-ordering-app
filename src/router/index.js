import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MeView from "@/views/MeView.vue";
import OrderView from "@/views/OrderView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/me", name: "me", component: MeView },
  { path: "/order", name: "order", component: OrderView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
