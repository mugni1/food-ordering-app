<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- END NAVBAR -->

  <!-- CONTENT -->
  <section class="pt-20">
    <h1>Home</h1>
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
    let token = localStorage.getItem("token");
    if (token == "" || token == null || token == false) {
      router.push({ name: "login" });
    }

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
        console.log(error);
        console.log("Erorr email or password");
      });
  },
};
</script>
