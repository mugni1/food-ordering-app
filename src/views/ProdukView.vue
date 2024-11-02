<template>
  <Navbar :name="name" :role_id="role_id" />
  <section class="py-20 p-5 flex flex-wrap w-full">
    <div class="w-full md:w-8/12 mx-auto mt-5">
      <button
        class="py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out"
      >
        <router-link to="/produk-add">Add New Produk</router-link>
      </button>
    </div>
    <table class="w-full md:w-8/12 mx-auto mt-5">
      <tr>
        <th class="border bg-slate-400">No</th>
        <th class="border bg-slate-400">Gambar</th>
        <th class="border bg-slate-400">Name</th>
        <th class="border bg-slate-400">Price</th>
        <th class="border bg-slate-400" colspan="2">Action</th>
      </tr>
      <tr v-for="(item, index) in items" class="w-full">
        <td class="border text-center">{{ index + 1 }}</td>
        <td class="border text-center flex justify-center py-3">
          <div
            :class="`bg-[url(${url}${item.image})] bg-cover bg-center bg-repeat h-20 w-36`"
          ></div>
        </td>
        <td class="border ps-2">{{ item.name }}</td>
        <td class="border text-center">Rp.{{ item.price }}</td>
        <td class="border text-center">
          <router-link :to="'/produk/' + item.id + '/update'">Edit</router-link>
        </td>
        <td class="border text-center"><button>Delete</button></td>
      </tr>
    </table>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
      items: [],
      url: "http://localhost/food-order-api/public/storage/img/",
    };
  },
  mounted() {
    if (this.role_id != 4) {
      router.push({ name: "home" });
    }

    this.getItems();
  },
  methods: {
    getItems() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/items",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
        .then((response) => {
          console.log(response.data.data);
          this.items = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
          console.log("Error fetch data");
        });
    },
  },
};
</script>
