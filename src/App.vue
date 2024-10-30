<template>
  <!-- HEADER -->
  <header
    v-if="$route['name'] != 'login'"
    class="flex flex-wrap bg-emerald-600 h-20 items-center px-5"
  >
    <div class="w-4/12 font-bold text-xl">
      <a
        href=""
        class="text-emerald-600 py-2 px-5 rounded-lg bg-white shadow-lg"
        >Brand</a
      >
    </div>
    <nav
      class="w-4/12 flex gap-5 font-semibold text-xl text-white justify-center"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <div class="w-4/12 flex font-semibold text-xl text-white justify-end">
      <h1>Hi Manager</h1>
    </div>
  </header>
  <!-- HEADER -->

  <router-view></router-view>
</template>

<script>
export default {};
</script>
