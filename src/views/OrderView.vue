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
                v-if="item.image != null"
                :style="`background-image: url(${url}${item.image});`"
                class="bg-cover bg-center bg-repeat w-full h-full group-hover:rotate-6 group-hover:scale-125 transition-all"
              ></div>
              <div
                v-else
                style="background-image: url('src/assets/no_img.png');"
                class="bg-cover bg-center bg-repeat w-full h-full group-hover:rotate-6 group-hover:scale-125 transition-all"
              ></div>
            </div>
            <h1>{{ item.name }}</h1>
            <h1>Rp. {{ item.price }}</h1>
            <button
              @click="addToOrder(index)"
              class="py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out mt-3"
            >
              Order
            </button>
          </div>
        </div>
        <!-- end card produk  -->
      </div>
      <!-- END LIST PRODUK -->
    </div>
    <!--END col1 -->

    <!-- COL 2 -->
    <div class="w-full md:w-4/12 border p-5">
      <!-- title  -->
      <h1 class="text-xl font-bold text-slate-800 border-b mb-3">List Order</h1>
      <!-- end title  -->
      <div v-if="total == null" class="w-full">
        Belum ada Order
      </div>
      <!-- order  -->
      <div
        v-for="(item, index) in orders"
        class="flex flex-wrap w-full justify-between"
      >
        <div class="leading-tight mb-2">
          <span>{{ item.name }} (x{{ item.qty }})</span>
          <br v-if="item.qty > 1" />
          <span v-if="item.qty > 1" class="text-xs">
            Rp. {{ item.price }} / 1</span
          >
          <br />
          <div class="flex gap-3">
            <button
              class="border px-2 rounded-md text-sm"
              @click="minesitem(index)"
            >
              -
            </button>
            <button
              class="border px-2 rounded-md text-sm"
              @click="plusItem(index)"
            >
              +
            </button>
            <button
              class="border px-2 rounded-md text-sm text-white bg-red-500"
            >
              delete
            </button>
          </div>
        </div>
        <span>Rp. {{ item.pricechart }}</span>
      </div>
      <!-- end order  -->
      <!-- total  -->
      <div
        v-if="total != null"
        class="flex flex-wrap w-full justify-between mt-2 border-t"
      >
        <span class="font-semibold">Total</span>
        <span class="font-semibold">Rp. {{ total }}</span>
      </div>
      <!-- end total  -->
    </div>
    <!--END COL 2 -->
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
      url: "http://localhost/food-order-api/public/storage/img/",
      orders: [],
      total: null,
    };
  },
  mounted() {
    // get list_items
    this.getItems();

    //jika tidak ada token tendang ke halaman login
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == ""
    ) {
      router.push({ name: "login" });
    }

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          this.items = response.data.data;
        })
        .catch(function (error) {
          let errorstatus = error.response.status;
          if (errorstatus == 401) {
            localStorage.clear();
            router.push({ name: "login" });
          }
          console.log(error);
        });
    },
    searchItem() {
      this.filterItem = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    addToOrder(index) {
      //cari produk dengan index yg sudah di tentukan
      let produk = this.filterItem[index];

      //jika ada produk yang sama di this.orders maka qty++ | produk nya tidak nambah
      let findProduk = this.orders.find((item) => item.id == produk.id);

      //jika produk ada alias tidak null
      if (findProduk != null) {
        findProduk.qty++;
        findProduk.pricechart = findProduk.price * findProduk.qty;
        // findProduk["price"] = findProduk.price * findProduk.qty;
      }
      // jika produk tidak ada alias null maka push dulu ini
      else {
        produk["qty"] = 1;
        produk["pricechart"] = produk.price;
        this.orders.push(produk);
      }

      this.total = this.orders.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
  },
};
</script>
