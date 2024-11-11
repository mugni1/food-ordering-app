<template>
  <Navbar :name="name" :role_id="role_id" />
  <section class="pt-20 w-full">
    <!-- select month  -->
    <div class="mt-5 w-full md:w-10/12 mx-auto flex justify-between h-10">
      <!-- select month  -->
      <div>
        <label for="month" class="font-bold">Month</label>
        <select
          name="month"
          id="month"
          class="border ms-4"
          v-model="selectMonth"
          @change="showOrder()"
        >
          <option v-for="(item, index) in month" :value="item.value">
            {{ item.name }}
          </option>
        </select>
      </div>
      <!-- end select month  -->
      <!-- Menampilkan Loading Indicator -->
      <div v-if="isLoading" class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="animate-spin h-10 w-10 fill-slate-400"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          ></path>
        </svg>
      </div>
      <!-- end loading indicator -->
    </div>
    <!-- end select month  -->

    <!-- Informasi Order  -->
    <div class="mt-5 w-full md:w-10/12 mx-auto flex flex-nowrap gap-10">
      <div
        class="w-4/12 border px-5 py-3 shadow-md rounded-md text-white bg-indigo-500 flex flex-wrap"
      >
        <h1 class="w-full font-bold">Order Count</h1>
        <h2 v-if="listOrder == null || listOrder.orderCount == 0">0</h2>
        <h2 v-else>{{ listOrder.orderCount }}</h2>
      </div>
      <div
        class="w-4/12 border px-5 py-3 shadow-md rounded-md text-white bg-yellow-500 flex flex-wrap"
      >
        <h1 class="w-full font-bold">Max Payment</h1>
        <h2 v-if="listOrder == null || listOrder.maxPayment == null">Rp. 0</h2>
        <h2 v-else>{{ listOrder.maxPayment }}</h2>
      </div>
      <div
        class="w-4/12 border px-5 py-3 shadow-md rounded-md text-white bg-purple-500 flex flex-wrap"
      >
        <h1 class="w-full font-bold">Min Payment</h1>
        <h2 v-if="listOrder == null || listOrder.minPayment == null">Rp. 0</h2>
        <h2 v-else>{{ listOrder.minPayment }}</h2>
      </div>
    </div>
    <!-- end Informasi order  -->

    <!-- list order  -->
    <table class="w-10/12 mx-auto mt-5 mb-10">
      <tr>
        <th class="border bg-slate-400 py-4">No</th>
        <th class="border bg-slate-400">Name</th>
        <th class="border bg-slate-400">Table No</th>
        <th class="border bg-slate-400">Date</th>
        <th class="border bg-slate-400">Time</th>
        <th class="border bg-slate-400">Status</th>
        <th class="border bg-slate-400">Total</th>
      </tr>
      <tr v-if="listOrder == null || listOrder.orderCount == 0">
        <th class="py-5 bg-red-500" colspan="8">
          No Data
        </th>
      </tr>
      <tr v-else v-for="(item, index) in listOrder.orderList">
        <td class="border text-center">{{ index + 1 }}</td>
        <td class="border px-2">{{ item.customer_name }}</td>
        <td class="border text-center">{{ item.table_no }}</td>
        <td class="border text-center">{{ item.order_date }}</td>
        <td class="border text-center">{{ item.order_time }}</td>
        <td class="border text-center">{{ item.status }}</td>
        <td class="border text-center">{{ item.total }}</td>
      </tr>
    </table>
    <!-- end list order  -->
  </section>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoading: false,
      name: localStorage.getItem("name"),
      role_id: localStorage.getItem("role_id"),
      selectMonth: 1,
      month: [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "Martch", value: 3 },
        { name: "April", value: 4 },
        { name: "Mei", value: 5 },
        { name: "Juni", value: 6 },
        { name: "Juli", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "Oktober", value: 10 },
        { name: "November", value: 11 },
        { name: "Desember", value: 12 },
      ],
      listOrder: null,
    };
  },
  methods: {
    showOrder() {
      this.isLoading = true;
      axios({
        method: "get",
        url: `http://localhost:8000/api/order-report?month=${this.selectMonth}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          this.listOrder = response.data.data;
        })
        .catch((error) => {
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
  },
};
</script>
