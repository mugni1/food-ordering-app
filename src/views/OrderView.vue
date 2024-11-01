<template>
  <!-- NAVBAR  -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- END NAVBAR  -->
  <section class="pt-20 w-full flex flex-wrap">
    <!-- col1 -->
    <div class="w-full md:w-8/12 flex flex-wrap justify-start items-start">
      <!-- SEARCH -->
      <div class="w-full p-5">
        <input
          type="search"
          name=""
          id=""
          class="border w-full py-2 px-3 rounded-lg outline-none shadow-md"
          placeholder="Search food or drink"
          v-model="keyword"
          :onchange="searchItem()"
        />
      </div>
      <!-- end SEARCH  -->
      <!-- LIST PRODUK -->
      <div class="w-full flex flex-wrap">
        <!-- card produk -->
        <div
          v-for="(item, index) in filterItem"
          class="w-1/2 md:w-4/12 p-5 group"
        >
          <div
            class="border text-center rounded-lg shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all ease-in-out duration-300 pb-5 overflow-hidden"
          >
            <div class="h-40 mb-5 w-full overflow-hidden">
              <div
                :class="`bg-[url('http://localhost/food-order-api/public/storage/img/${item.image}')] bg-cover bg-center bg-repeat w-full h-full group-hover:rotate-6 group-hover:scale-125 transition-all`"
              ></div>
            </div>
            <h1>{{ item.name }}</h1>
            <h1>Rp. {{ item.price }}</h1>
          </div>
        </div>
        <!-- end card produk  -->
      </div>
      <!-- END LIST PRODUK -->
    </div>

    <!-- col1 -->
    <div class="w-full md:w-4/12 border p-5">
      <h1>List Order</h1>
    </div>
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
      filterItem: [],
      keyword: "",
    };
  },
  mounted() {
    //jika tidak ada token tendang ke halaman login
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == ""
    ) {
      router.push({ name: "login" });
    }

    // get all items
    this.getItems();

    // middleware
    if (this.role_id != 1 && this.role_id != 4) {
      router.push({ name: "home" });
    }
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
    searchItem() {
      this.filterItem = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
};
</script>
