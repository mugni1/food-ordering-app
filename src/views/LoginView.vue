<template>
  <div
    style="
      background: url('bg.jpg');
      background-position: bottom;
      background-size: cover;
    "
    class="relative z-0 flex flex-wrap w-full min-h-screen justify-center items-center"
  >
    <!-- CARD FORM  -->
    <div
      class="absolute z-20 md:w-4/12 xl:w-3/12 py-10 bg-white bg-opacity-70 border rounded-2xl shadow-lg px-10 backdrop-blur-sm"
    >
      <!-- Title -->
      <div class="mb-5">
        <h1 class="text-center font-bold text-2xl">Login</h1>
      </div>
      <!-- end title -->

      <!-- EMAIL -->
      <div class="mb-2 flex flex-wrap">
        <label for="" class="w-full font-semibold">Email</label>
        <label v-if="emailValidate == 'valid'" class="w-full text-emerald-600"
          >Email valid good</label
        >
        <label v-if="emailValidate == 'notValid'" class="w-full text-red-600"
          >Email not valid use | a-z, _, 0-9</label
        >
        <input
          type="email"
          class="w-full border p-1 rounded-md shadow-md outline-none"
          v-model="email"
        />
      </div>
      <!-- END EMAIL -->

      <!-- PASSEORD -->
      <div class="mb-2">
        <label for="" class="w-full font-semibold">Password</label>
        <input
          v-if="notShowPassword"
          type="password"
          class="w-full border p-1 rounded-md shadow-md outline-none"
          v-model="password"
        />
        <input
          v-else
          type="text"
          class="w-full border p-1 rounded-md shadow-md outline-none"
          v-model="password"
        />
      </div>
      <!-- END PASSWORD -->

      <!-- SHOW PASSWORD  -->
      <div class="mb-5">
        <button
          @click="showpw()"
          class="py-1 px-3 bg-emerald-600 rounded-xl text-white"
          v-if="notShowPassword"
        >
          Show Password
        </button>
        <button
          @click="hidepw()"
          class="py-1 px-3 bg-yellow-600 rounded-xl text-white"
          v-else
        >
          Hide Password
        </button>
      </div>
      <!-- END SHOW PASSWORD  -->

      <!-- BTN SUBMIT  -->
      <div class="mb-2">
        <button
          :disabled="isLoading"
          class="w-full flex justify-center py-1 px-5 bg-emerald-600 rounded-full text-white hover:text-slate-400 shadow-md hover:bg-emerald-800 active:ring-2 ring-green-400"
          @click="login()"
        >
          <!-- Menampilkan Loading Indicator -->
          <div v-if="isLoading" class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="animate-spin h-6 w-6 fill-slate-400"
            >
              <path
                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              ></path>
            </svg>
          </div>
          <!-- end loading indicator -->
          <span v-else> SUBMIT</span>
        </button>
      </div>
      <!-- END BTN SUBMIT  -->
    </div>
    <!-- END CARD FORM  -->
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      isLoading: false,
      email: null,
      password: null,
      notShowPassword: true,
      emailValidate: null,
      token: null,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      axios({
        method: "post",
        url: "http://localhost:8000/api/login/auth",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(function (response) {
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("role_id", response.data.data.role_id);
          localStorage.setItem("token", response.data.data.token);
          // after login push to home
          router.push({ name: "home" });
        })
        .catch(function (error) {
          if (error.status == 422) {
            swal({
              icon: "error",
              title: "Error Login",
              text: "Kata Sandi Atau Password salah",
            });
          } else {
            swal({
              icon: "error",
              title: "Error Server",
              text: "Server sedang mengalami masalah, Coba lagi nanti",
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showpw() {
      this.notShowPassword = false;
    },
    hidepw() {
      this.notShowPassword = true;
    },
  },
  watch: {
    email(value) {
      let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (regex.test(value)) {
        this.emailValidate = "valid";
      } else {
        this.emailValidate = "notValid";
      }
    },
  },
  mounted() {
    if (localStorage.getItem("token") != null) {
      router.push({ name: "home" });
    }
  },
};
</script>
