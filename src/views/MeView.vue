<template>
  <!-- NAVBAR  -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- END NAVBAR  -->

  <!-- CONTENT  -->
  <section
    class="w-full flex flex-wrap justify-center items-center min-h-screen pt-20"
  >
    <!-- card -->
    <CardProfile :name="name" :email="email" :status="status" />
    <!-- end card -->
  </section>
  <!-- END CONTENT  -->
</template>

<script>
import CardProfile from "@/components/CardProfile.vue";
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    Navbar,
    CardProfile,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      status: localStorage.getItem("status"),
      role_id: localStorage.getItem("role_id"),
    };
  },
  mounted() {
    this.getUser();
    if (localStorage.getItem("token") == null) {
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
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role_id");
            localStorage.removeItem("status");
            router.push({ name: "login" });
          }
          console.log(error);
        });
    },
  },
};
</script>
