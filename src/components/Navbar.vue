<template>
  <!-- HEADER -->
  <header
    v-if="$route['name'] != 'login'"
    class="flex flex-wrap bg-emerald-600 h-20 items-center px-5 fixed w-full"
  >
    <div class="w-4/12 font-bold text-xl">
      <a
        href=""
        class="text-emerald-600 py-2 px-5 rounded-lg bg-white shadow-lg"
        >Brand</a
      >
    </div>
    <nav
      class="w-4/12 flex gap-5 font-semibold text-xl text-white justify-center"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/me">Profile</router-link>
    </nav>
    <div class="w-4/12 flex font-semibold text-xl text-white justify-end gap-5">
      <h1>Hi {{ name }}</h1>
      <button @click="logout()">Logout</button>
    </div>
  </header>
  <!-- HEADER -->
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  props: ["name"],

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
