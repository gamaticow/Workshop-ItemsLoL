<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-600 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">LoL</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Items
        </router-link>
        <router-link
          to="/game"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Game
        </router-link>
      </div>
    </div>
    <div>
      <div class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mt-4 lg:mt-0">Score : {{ score }}<span v-show="streak >= 3"><br>Streak : {{ streak }}</span></div>
    </div>
  </nav>
  <router-view />
  <div
    v-if="loading"
    class="w-full h-full fixed inset-0 bg-slate-800 flex flex-col items-center justify-center"
  >
    <div
      class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-slate-500"
      disabled=""
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading...
    </div>
  </div>
  <div
    v-if="error"
    class="w-full h-full fixed inset-0 bg-red-800 flex flex-col items-center justify-center"
  >
    <div class="text-white">Une erreur s'est produite</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "./store";

export default defineComponent({
  name: "App",
  computed: {
    loading() {
      return store.state.loading;
    },
    error() {
      return store.state.error;
    },
    score() {
      return store.state.score;
    },
    streak() {
      return store.state.streak;
    },
  },
  beforeMount() {
    store.dispatch("fetchItems");
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
  height: 100%;
}
</style>
