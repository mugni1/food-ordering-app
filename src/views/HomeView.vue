<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- END NAVBAR -->

  <!-- CONTENT -->
  <section class="flex flex-wrap min-h-screen px-5">
    <div class="w-full md:w-1/2 h-1/2 md:h-screen flex flex-wrap items-center">
      <div class="w-full flex flex-wrap">
        <h1
          class="font-bold text-5xl bg-gradient-to-br from-emerald-500 to-sky-600 bg-clip-text text-transparent text-shadow w-full"
        >
          FOOD
        </h1>
        <h1 class="font-bold text-5xl text-slate-800 text-shadow w-full">
          ORDERING APP
        </h1>
        <h3 class="font-semibold text-2xl text-slate-700 w-full mt-3">
          Application to manage orders and food, in your restaurant
        </h3>
        <div class="py-5 flex gap-5">
          <button
            class="px-5 py-2 rounded-full border border-green-800 bg-emerald-500 text-white font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 h-full md:h-1/2">
      <h1>Today</h1>
    </div>
  </section>
  <!-- END CONTENT  -->
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      token: null,
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
    };
  },
  mounted() {
    this.getUser();
    let token = localStorage.getItem("token");
    if (token == "" || token == null || token == false) {
      router.push({ name: "login" });
    }
  },
  methods: {
    getUser() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(function (response) {
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("role_id", response.data.data.role_id);
          localStorage.setItem("status", response.data.data.role.name);
        })
        .catch(function (error) {
          let errorstatus = error.response.status;
          if (errorstatus == 401) {
            localStorage.clear();
            router.push({ name: "login" });
          }
          console.log(error);
        });
    },
  },
};
</script>
