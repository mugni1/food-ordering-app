<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

axios;
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      status: localStorage.getItem("status"),
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/me",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        console.log(response);
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

<template>
  <!-- NAVBAR  -->
  <Navbar :name="name" />
  <!-- END NAVBAR  -->

  <!-- CONTENT  -->
  <section
    class="w-full flex flex-wrap justify-center items-center min-h-screen pt-20"
  >
    <!-- CARD -->
    <div class="p-5 shadow-md w-1/2 md:w-3/12 rounded-lg border flex flex-wrap">
      <!-- JUDUL  -->
      <h1 class="font-bold text-center text-2xl mb-5 w-full">Profile</h1>
      <!-- END JUDUL  -->
      <!-- PP  -->
      <div class="w-full flex flex-wrap justify-center">
        <img src="/pp.jfif" alt="" class="rounded-full shadow-md" />
      </div>
      <!-- END PP  -->
      <!-- INFORMATION  -->
      <div class="w-full font-semibold text-lg text-center mt-5">
        <h1>Name - {{ name }}</h1>
        <h1>Email - {{ email }}</h1>
        <h1>Status - {{ status }}</h1>
      </div>
      <!-- END INFORMATION  -->
    </div>
    <!-- END CARD -->
  </section>
  <!-- END CONTENT  -->
</template>
