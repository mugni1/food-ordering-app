<template>
  <Navbar :name="name" :role_id="role_id" />
  <section class="py-20 p-5 flex flex-wrap w-full">
    <div class="w-full md:w-8/12 mx-auto mt-5">
      <button
        v-if="isLoading == false"
        class="py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out"
      >
        <router-link to="/produk-add">Add New Produk</router-link>
      </button>
    </div>
    <!-- Menampilkan Loading Indicator -->
    <div v-if="isLoading" class="flex justify-center items-center w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="animate-spin w-32 h-32 fill-slate-400"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
        ></path>
      </svg>
    </div>
    <!-- end loading indicator -->
    <!-- list produk -->
    <table v-else class="w-full md:w-8/12 mx-auto mt-5">
      <tr class="w-full">
        <th class="border bg-slate-400 w-1/12 py-4">No</th>
        <th class="border bg-slate-400 w-3/12">Gambar</th>
        <th class="border bg-slate-400 w-4/12">Name</th>
        <th class="border bg-slate-400 w-2/12">Price</th>
        <th class="border bg-slate-400 w-2/12" colspan="2">Action</th>
      </tr>
      <tr v-for="(item, index) in items" class="w-full">
        <td class="border text-center">{{ index + 1 }}</td>
        <td class="border text-center flex justify-center py-3">
          <div
            v-if="item.image != null"
            :style="{ backgroundImage: `url(${url}${item.image})` }"
            class="bg-cover bg-center bg-repeat h-20 w-36"
          ></div>
          <div
            v-else
            style="background-image: url('src/assets/no_img.png');"
            class="bg-cover bg-center bg-repeat h-20 w-36"
          ></div>
        </td>
        <td class="border ps-2">
          {{ item.name }}
        </td>
        <td class="border text-center">Rp.{{ item.price }}</td>
        <td class="border text-center w-1/12">
          <router-link :to="'/produk/' + item.id + '/update'">Edit</router-link>
        </td>
        <td class="border text-center w-1/12">
          <button @click="drop(item.id)">delete</button>
        </td>
      </tr>
    </table>
    <!-- end list produk  -->
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
      isLoading: true,
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
      items: [],
      url: "http://localhost/food-order-api/public/storage/img/",
    };
  },
  mounted() {
    this.getItems();
    if (this.role_id != 4) {
      router.push({ name: "home" });
    }
  },
  methods: {
    getItems() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/items",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch(function (error) {
          let errorstatus = error.response.status;
          if (errorstatus == 401) {
            localStorage.clear();
            router.push({ name: "login" });
          }
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    drop(id) {
      let isConfirm = confirm("Apakah anda yakin ingin menghapus?");
      if (isConfirm == true) {
        axios({
          method: "delete",
          url: `http://localhost:8000/api/item/${id}/delete`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response.data.data);
            alert("berhasil menghapus");
            window.location.reload();
          })
          .catch(function (error) {
            let errorstatus = error.response.status;
            if (errorstatus == 403) {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.removeItem("email");
              localStorage.removeItem("role_id");
              localStorage.removeItem("status");
              router.push({ name: "login" });
            }
            console.log(error);
          });
      } else {
        alert("Penghapusan di batalkan");
      }
    },
  },
};
</script>
