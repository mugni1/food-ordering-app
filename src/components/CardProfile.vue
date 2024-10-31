<template>
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
</template>

<script>
export default {
  props: ["name", "email", "status"],
};
</script>
