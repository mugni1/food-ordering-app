import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MeView from "@/views/MeView.vue";
import OrderView from "@/views/OrderView.vue";
import ProdukView from "@/views/ProdukView.vue";
import ProdukUpdateView from "@/views/ProdukUpdateView.vue";
import ProdukAddView from "@/views/ProdukAddView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/me", name: "me", component: MeView },
  { path: "/order", name: "order", component: OrderView },
  { path: "/produk", name: "produk", component: ProdukView },
  { path: "/produk-add", name: "produkAdd", component: ProdukAddView },
  {
    path: "/produk/:produkId/update",
    name: "produkUpdate",
    component: ProdukUpdateView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
