<template>
  <div class="grid grid-cols-10 gap-4 p-10">
    <div
      v-for="item of items"
      :key="item.id"
      class="w-32 h-40 bg-slate-600 rounded-md shadow shadow-slate-800 flex flex-col items-center justify-center cursor-pointer"
      @click="$router.push({name: 'item', params: {id: item.id}})">
      <img class="w-16 h-16" :src="item.iconPath" />
      <div>{{ item.name }}</div>
      <div>{{ item.priceTotal }} Po</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/@types/item";
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShopView",
  computed: {
    items(): Item[] {
      return store.getters.filtredItems;
    },
  },
});
</script>
