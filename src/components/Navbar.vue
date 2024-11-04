<template>
  <!-- HEADER -->
  <header
    v-if="$route['name'] != 'login'"
    class="flex flex-wrap bg-emerald-600 h-20 items-center px-5 fixed z-50 w-full"
  >
    <div class="w-3/12 font-bold text-xl">
      <a
        href=""
        class="text-emerald-600 py-2 px-5 rounded-lg bg-white shadow-lg"
        >RESTO GO</a
      >
    </div>
    <nav
      class="w-6/12 flex gap-5 font-semibold text-xl text-white justify-center"
    >
      <router-link
        to="/"
        class="py-2 px-5 rounded-lg hover:bg-emerald-700 active:ring-2 ring-blue-600 active:bg-sky-500 active:text-slate-700"
        >Home</router-link
      >
      <router-link
        to="/order"
        class="py-2 px-5 rounded-lg hover:bg-emerald-700 active:ring-2 ring-blue-600 active:bg-sky-500 active:text-slate-700"
        v-if="role_id == 1 || role_id == 4"
        >Order</router-link
      >
      <router-link
        to="/order-list"
        class="py-2 px-5 rounded-lg hover:bg-emerald-700 active:ring-2 ring-blue-600 active:bg-sky-500 active:text-slate-700"
        >Order List</router-link
      >
      <router-link
        to="/produk"
        class="py-2 px-5 rounded-lg hover:bg-emerald-700 active:ring-2 ring-blue-600 active:bg-sky-500 active:text-slate-700"
        v-if="role_id == 4"
        >Produk</router-link
      >
    </nav>
    <div class="w-3/12 flex font-semibold text-xl text-white justify-end gap-5">
      <router-link to="/me" class="py-2 px-5 rounded-lg hover:bg-emerald-700"
        >Hi {{ name }}</router-link
      >
      <button
        @click="logout()"
        class="py-2 px-5 rounded-lg hover:bg-emerald-700 active:ring-2 ring-blue-600 active:bg-sky-500 active:text-slate-700"
      >
        Logout
      </button>
    </div>
  </header>
  <!-- HEADER -->
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  props: ["name", "role_id"],

  data() {
    return {};
  },
  methods: {
    logout() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/logout",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(function (response) {
          console.log(response);
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          localStorage.removeItem("role_id");
          localStorage.removeItem("token");
          localStorage.removeItem("status");
          router.push({ name: "login" });
        })
        .catch(function (error) {
          console.log(error);
          console.log("Erorr email or password");
        });
    },
  },
};
</script>
