<template>
  <Navbar :name="name" :role_id="role_id" />
  <div>
    <h1>Produk</h1>
  </div>
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
    if (this.role_id != 4) {
      router.push({ name: "home" });
    }
  },
};
</script>
