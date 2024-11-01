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
    if (localStorage.getItem("token") == null) {
      router.push({ name: "login" });
    }
  },
};
</script>
