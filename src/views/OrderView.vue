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
      <!-- Menampilkan Loading Indicator -->
      <div v-if="isLoading" class="flex justify-center items-start w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="animate-spin w-20 h-20 fill-slate-400"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          ></path>
        </svg>
      </div>
      <!-- end loading indicator -->
      <!-- LIST PRODUK -->
      <div v-else class="w-full flex flex-wrap justify-start items-start">
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
              class="flex justify-center mx-auto gap-2 py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out mt-3"
            >
              Order
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
              >
                <path
                  d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- end card produk  -->
      </div>
      <!-- END LIST PRODUK -->
    </div>
    <!--END col1 -->

    <!-- COL 2 -->
    <div class="w-full md:w-4/12 p-5">
      <!-- title  -->
      <h1 class="text-lg font-bold text-slate-800 border-b mb-3">Customer</h1>
      <!-- end title  -->
      <!-- customerName  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="customerName" class="w-full">Name</label>
        <input
          type="text"
          class="w-full border py-1 px-1"
          placeholder="Agus Kulehe"
          id="customerName"
          v-model="customerName"
        />
      </div>
      <!-- end customerName  -->
      <!-- cutomerTableNo  -->
      <div class="w-full flex flex-wrap mb-2">
        <label for="cutomerTableNo" class="w-full">Table No</label>
        <input
          type="number"
          class="w-full border py-1 px-1"
          placeholder="20"
          id="customerTableNo"
          v-model="customerTableNo"
        />
      </div>
      <!-- end cutomerTableNo  -->
      <!-- title  -->
      <h1 class="text-lg font-bold text-slate-800 border-b mb-3">List Order</h1>
      <!-- end title  -->
      <!-- order  -->
      <div v-if="total == null || total == ''" class="w-full">
        Not item orders
      </div>
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
              @click="plusItem(index)"
            >
              +
            </button>
            <button
              @click="deleteItem(index)"
              class="border px-2 rounded-md text-sm text-white bg-red-500"
            >
              delete
            </button>
            <button
              v-if="item.qty > 1"
              class="border px-2 rounded-md text-sm"
              @click="minesItem(index)"
            >
              -
            </button>
          </div>
        </div>
        <span>Rp. {{ item.pricechart }}</span>
      </div>
      <!-- end order  -->
      <!-- total  -->
      <div
        v-if="total != null && total != ''"
        class="flex flex-wrap w-full justify-between border-t border-b py-2 mt-2"
      >
        <span class="font-semibold">Total</span>
        <span class="font-semibold">Rp. {{ total }}</span>
      </div>
      <!-- end total  -->
      <!-- btn order  -->
      <div class="w-full mt-5">
        <button
          @click="sendOrder()"
          class="w-full flex justify-center gap-2 py-2 px-5 bg-emerald-600 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-100 active:bg-emerald-800 active:ring-2 ring-sky-500 ease-in-out mt-3"
          :disabled="processing"
        >
          <div v-if="!processing" class="w-full flex justify-center">
            Finish Order
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current font-bold"
            >
              <path
                d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"
              ></path>
            </svg>
          </div>
          <div v-else class="w-full flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="animate-spin w-5 h-5 fill-current"
            >
              <path
                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <!--end btn order  -->
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
      processing: false,
      isLoading: true,
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
      items: [],
      filterItem: [],
      keyword: "",
      url: "http://localhost/food-order-api/public/storage/img/",
      customerName: null,
      customerTableNo: null,
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
        })
        .finally(() => {
          this.isLoading = false;
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
    plusItem(index) {
      let produk = this.orders[index];
      produk.qty++;
      produk.pricechart = produk.price * produk.qty;
      this.total = this.orders.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
    minesItem(index) {
      let produk = this.orders[index];
      produk.qty--;
      produk.pricechart = produk.price * produk.qty;
      this.total = this.orders.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
    deleteItem(index) {
      this.orders.splice(index, 1);
      this.total = this.orders.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
    sendOrder() {
      if (this.customerName == null || this.customerName == "") {
        return alert("Customer name cannot null");
      }
      if (this.customerTableNo == null || this.customerTableNo == "") {
        return alert("Customer table no cannot null");
      }
      if (this.orders == [] || this.orders == null || this.orders == "") {
        return alert("Please select one produc for order");
      }
      this.processing = true;
      //items
      let orderItems = this.orders.map((item) => [item.id, item.qty]);
      axios({
        method: "post",
        url: "http://localhost:8000/api/create_order",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          customer_name: this.customerName,
          table_no: this.customerTableNo,
          items: orderItems,
        },
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            alert("Success create order, Please wait for your food");
            // set order to array null
            this.orders = [];
            // set total to null
            this.total = null;
            // set customer name to null
            this.customerName = null;
            // set customer table no to null
            this.customerTableNo = null;
          }
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
          this.processing = false;
        });
    },
  },
};
</script>
