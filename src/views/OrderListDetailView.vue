<template>
  <!-- NAVBAR  -->
  <Navbar :name="name" :role_id="role_id" />
  <!-- NAVBAR  -->
  <section class="w-full py-20">
    <!-- title  -->
    <h1 class="mx-auto text-center mt-5 font-bold text-xl text-white">
      <span class="bg-emerald-600 py-1 px-5 rounded-xl">Order Detail</span>
    </h1>
    <!-- title  -->

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

    <!-- detail  -->
    <div v-else class="mx-auto w-full md:w-1/2 border mt-5 p-5 rounded-md">
      <div class="w-full flex flex-wrap border-b pb-2 mb-5">
        <div class="w-full">Name : {{ orderDetails.customer_name }}</div>
        <div class="w-full">TableNo : {{ orderDetails.table_no }}</div>
        <div class="w-full">Status : {{ orderDetails.status }}</div>
        <div class="w-full">
          Waiters : {{ orderDetails.waitress.name }} ({{
            orderDetails.waitress.role.name
          }})
        </div>
        <div class="w-full">
          <span
            v-if="
              orderDetails.cashier == null || orderDetails.cashier_id == null
            "
          >
            Cashier : -</span
          >
          <span v-else>Cashier : {{ orderDetails.cashier.name }}</span>
        </div>
        <div class="w-full">
          Date : 2024-10-28
        </div>
        <div class="w-full">
          Time : 17:25:10
        </div>
      </div>
      <div class="w-full flex flex-wrap pb-2 mb-4">
        <table class="w-full">
          <tr class="w-full">
            <th class="border w-3/12 py-2">Name</th>
            <th class="border w-3/12">Price</th>
            <th class="border w-3/12">Quantity</th>
            <th class="border w-3/12">Total</th>
          </tr>
          <tr v-for="(item, index) in orderDetails.order_detail">
            <td class="border text-center py-2">{{ item.item.name }}</td>
            <td class="border text-center">Rp. {{ item.price }}</td>
            <td class="border text-center">{{ item.qty }}</td>
            <td class="border text-center">Rp. {{ item.price * item.qty }}</td>
          </tr>
          <tr>
            <td class="border text-center py-5 font-bold w-9/12" colspan="3">
              Total All Price
            </td>
            <td class="border text-center w-3/12 font-bold">
              Rp. {{ orderDetails.total }}
            </td>
          </tr>
        </table>
      </div>
      <!-- action -->
      <div class="w-full flex flex-wrap gap-5">
        <button
          v-if="orderDetails.status == 'ordered' && role_id == 2"
          class="bg-yellow-600 py-1 px-5 font-bold text-white rounded-lg shadow-md hover:bg-slate-600"
          @click="setAsDone($route.params.orderId)"
          :disabled="proccesing"
        >
          <span v-if="!proccesing">Done</span>
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
        <button
          v-if="role_id == 3 || (role_id == 4 && orderDetails.status == 'done')"
          class="bg-green-600 py-1 px-5 font-bold text-white rounded-lg shadow-md hover:bg-slate-600"
          @click="setAsPaid($route.params.orderId)"
          :disabled="proccesing"
        >
          <span v-if="!proccesing">Paid</span>
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
        <button
          v-if="role_id == 4"
          class="bg-red-600 py-1 px-5 font-bold text-white rounded-lg shadow-md hover:bg-slate-600"
          @click="drop($route.params.orderId)"
          :disabled="proccesingDelete"
        >
          <span v-if="!proccesingDelete">Delete</span>
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
      <!--end action -->
    </div>
    <!-- detail  -->
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
      isLoading: true,
      proccesing: false,
      proccesingDelete: false,
      orderDetails: [],
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null || token == "") {
      localStorage.clear();
      router.push({ name: "login" });
    }
    this.getOrderDetails(this.$route.params.orderId);
  },
  methods: {
    getOrderDetails(orderId) {
      axios({
        method: "get",
        url: `http://localhost:8000/api/order/${orderId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          this.orderDetails = response.data.data;
        })
        .catch((error) => {
          console.log(error);
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
    setAsDone(orderId) {
      this.proccesing = true;
      axios({
        method: "get",
        url: `http://localhost:8000/api/order/${orderId}/set_done`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          alert("Order ready to consume for customer");
          router.push({ name: "orderList" });
        })
        .catch((error) => {
          let errorstatus = error.response.status;
          if (errorstatus == 403) {
            localStorage.clear();
            router.push({ name: "login" });
          }
        })
        .finally(() => {
          this.proccesing = false;
        });
    },
    setAsPaid(orderId) {
      this.proccesing = true;
      axios({
        method: "get",
        url: `http://localhost:8000/api/order/${orderId}/set_paid`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          alert("User success payment");
          router.push({ name: "orderList" });
        })
        .catch((error) => {
          let errorstatus = error.response.status;
          if (errorstatus == 403) {
            localStorage.clear();
            router.push({ name: "login" });
          }
        })
        .finally(() => {
          this.proccesing = false;
        });
    },
    drop(orderId) {
      this.proccesingDelete = true;
      axios({
        method: "delete",
        url: `http://localhost:8000/api/order/${orderId}/delete`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          alert("Deleted Successfully");
          router.push({ name: "orderList" });
        })
        .catch((error) => {
          let errorstatus = error.response.status;
          if (errorstatus == 403) {
            localStorage.clear();
            router.push({ name: "login" });
          }
        })
        .finally(() => {
          this.proccesingDelete = false;
        });
    },
  },
};
</script>
