<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!--END NAVBAR -->

  <section class="py-20 flex flex-wrap w-full">
    <!-- FORM  -->
    <div
      class="container mx-auto w-full md:w-1/2 border py-5 px-5 mt-5 rounded-lg shadow-md flex flex-wrap"
    >
      <!-- title  -->
      <h1 class="font-bold text-xl w-full text-center">Produk Add</h1>
      <!-- name  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="name" class="font-semibold full">Name</label>
        <input
          type="text"
          id="name"
          class="py-1 px-2 border w-full rounded-lg outline-none"
          placeholder="Ayam Bakar"
        />
      </div>
      <!-- price  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="price" class="font-semibold full">Price</label>
        <input
          type="number"
          id="price"
          class="py-1 px-2 border w-full rounded-lg outline-none"
          placeholder="20000"
        />
      </div>
      <!-- image  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="image" class="font-semibold full">Image</label>
        <input
          type="file"
          id="image"
          class="py-2 px-2 border w-full rounded-lg outline-none"
        />
      </div>
      <!-- Btn  -->
      <div class="w-full flex flex-wrap mb-2 mt-10">
        <button
          class="py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
    <!-- END FORM  -->
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
