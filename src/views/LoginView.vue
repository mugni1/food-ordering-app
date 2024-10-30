<template>
  <div class="flex flex-wrap w-full min-h-screen justify-center items-center">
    <!-- CARD FORM  -->
    <div
      class="md:w-4/12 xl:w-3/12 py-10 bg-white border rounded-2xl shadow-md px-10"
    >
      <!-- Title -->
      <div class="mb-10">
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
          class="py-1 px-5 bg-emerald-600 rounded-full text-white hover:text-slate-400 shadow-md hover:bg-emerald-800 active:ring-2 ring-green-400"
          @click="login()"
        >
          SUBMIT
        </button>
      </div>
      <!-- END BTN SUBMIT  -->
    </div>
    <!-- END CARD FORM  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      notShowPassword: true,
      emailValidate: null,
    };
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
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
};
</script>
