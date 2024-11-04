<template>
  <!-- Navbar  -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- Navbar  -->
  <!-- Content -->
  <section class="py-20 w-full">
    <!-- Menampilkan Loading Indicator -->
    <div v-if="isLoading" class="flex justify-center items-center w-full mt-5">
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
    <table v-else class="w-10/12 mx-auto mt-5">
      <tr>
        <th class="border bg-slate-400 py-4">No</th>
        <th class="border bg-slate-400">Name</th>
        <th class="border bg-slate-400">Table No</th>
        <th class="border bg-slate-400">Time</th>
        <th class="border bg-slate-400">Status</th>
        <th class="border bg-slate-400">Total</th>
        <th class="border bg-slate-400" colspan="2">Acrion</th>
      </tr>
      <tr v-for="(item, index) in orders" :key="index">
        <td class="border text-center bg-slate-300">{{ index + 1 }}</td>
        <td class="border px-2">{{ item.customer_name }}</td>
        <td class="border px-2 text-center">{{ item.table_no }}</td>
        <td class="border text-center">{{ item.order_time }}</td>
        <td class="border text-center py-4">
          <span
            class="py-1 px-4 rounded-lg bg-red-600 text-white font-semibold"
            v-if="item.status == 'ordered'"
            >{{ item.status }}</span
          >
          <span
            class="py-1 px-4 rounded-lg bg-yellow-600 text-white font-semibold"
            v-if="item.status == 'done'"
            >{{ item.status }}</span
          >
          <span
            class="py-1 px-4 rounded-lg bg-green-600 text-white font-semibold"
            v-if="item.status == 'paid'"
            >{{ item.status }}</span
          >
        </td>
        <td class="border text-center">Rp. {{ item.total }}</td>
        <!-- <td v-if="role_id == 4" class="border text-center">Delete</td> -->
        <td class="border text-center">
          <router-link :to="`/order/${item.id}/detail`"
            ><span class="px-5 py-1 rounded-lg bg-slate-300 hover:bg-slate-600"
              >Detail</span
            ></router-link
          >
        </td>
      </tr>
    </table>
  </section>
  <!-- Content -->
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
      isLoading: true,
      orders: [],
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null || token == "") {
      localStorage.clear();
      router.push({ name: "login" });
    }
    this.getOrders();
  },
  methods: {
    getOrders() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/order",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          this.orders = response.data.data;
        })
        .catch((error) => {
          console.error;
          let errorstatus = error.response.status;
          if (errorstatus == 403) {
            localStorage.clear();
            router.push({ name: "login" });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
