<template>
  <!-- NAVBAR  -->
  <Navbar :name="name" />
  <!-- END NAVBAR  -->
  <section class="pt-20">
    <h1>Order View</h1>
  </section>
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
      name: localStorage.getItem("name"),
    };
  },
  mounted() {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == ""
    ) {
      router.push({ name: "login" });
    }
  },
};
</script>
