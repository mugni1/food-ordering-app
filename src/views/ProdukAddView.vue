<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!--END NAVBAR -->

  <section class="py-20 flex flex-wrap w-full">
    <div
      class="container mx-auto w-full md:w-1/2 border py-5 mt-5 rounded-lg"
    ></div>
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
      role_id: localStorage.getItem("role_id"),
    };
  },
  mounted() {
    this.isAdmin();
  },
  methods: {
    isAdmin() {
      if (this.role_id != 4) {
        return router.push({ name: "home" });
      }
    },
  },
};
</script>
