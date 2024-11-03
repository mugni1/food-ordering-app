<template>
  <!-- NAVBAR -->
  <Navbar :name="name" :role_id="role_id" />
  <!--END NAVBAR -->

  <section class="py-20 flex flex-wrap w-full">
    <!-- FORM  -->
    <form
      @submit.prevent="updateProduk($route.params.produkId)"
      class="container mx-auto w-full md:w-1/2 border py-5 px-5 mt-5 rounded-lg shadow-md flex flex-wrap"
    >
      <!-- title  -->
      <h1 class="font-bold text-xl w-full text-center">
        Edit Produk {{ $route.params.produkId }}
      </h1>
      <!-- name  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="name" class="font-semibold full">Name</label>
        <input
          type="text"
          id="name"
          class="py-1 px-2 border w-full rounded-lg outline-none"
          placeholder="Ayam Bakar"
          v-model="nameProduk"
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
          v-model="priceProduk"
        />
      </div>
      <!-- image  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="image" class="font-semibold full">Image</label>
        <input
          type="file"
          id="image"
          class="py-2 px-2 border w-full rounded-lg outline-none"
          @change="imageChange($event)"
        />
      </div>
      <!-- Btn  -->
      <div class="w-full flex flex-wrap mb-2 mt-10">
        <button
          type="submit"
          class="py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
    <!-- END FORM  -->
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import axios from "axios";

export default {
  props: [],
  components: {
    Navbar,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
      nameProduk: "",
      priceProduk: "",
      imageProduk: null,
    };
  },
  mounted() {
    this.isAdmin();
    this.showItem(this.$route.params.produkId);
  },
  methods: {
    isAdmin() {
      if (this.role_id != 4) {
        return router.push({ name: "home" });
      }
    },
    showItem(produkId) {
      axios({
        method: "get",
        url: `http://localhost:8000/api/item/${produkId}/show`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          this.nameProduk = response.data.data.name;
          this.priceProduk = response.data.data.price;
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
    imageChange(e) {
      this.imageProduk = e.target.files[0];
    },
    //update produk
    updateProduk(produkId) {
      if (this.nameProduk == null || this.nameProduk == "") {
        alert("Cannot null nama produk");
      }
      if (this.nameProduk == null || this.nameProduk == "") {
        alert("Cannot null price produk");
      }
      axios({
        method: "post",
        url: `http://localhost:8000/api/item/${produkId}/update`,
        data: {
          name: this.nameProduk,
          price: this.priceProduk,
          image: this.imageProduk,
          _method: "put",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(response);
          router.push({ name: "produk" });
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
          if (errorstatus == 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role_id");
            localStorage.removeItem("status");
            router.push({ name: "login" });
          }
          console.log(error);
          console.log(error);
        });
    },
  },
};
</script>
