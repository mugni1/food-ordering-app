<template>
  <!-- NAVBAR -->
  <Navbar :name="name" />
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

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      token: null,
      name: localStorage.getItem("name"),
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == "" || token == null || token == false) {
      router.push({ name: "login" });
    }
  },
};
</script>
