<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!--END NAVBAR -->
  <section class="py-20">
    <h1>Produk Add</h1>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

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
  mounted() {},
};
</script>
