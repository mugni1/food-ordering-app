<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      token: null,
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
