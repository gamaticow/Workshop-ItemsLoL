<template>
    <div class="text-white p-10" v-if="item">
      <img class="w-16 h-16" :src="item.iconPath" />
      <div><strong>{{ item.name }}</strong></div>
      <div v-if="itemTree.components.length > 0">Composants :</div>
      <div class="flex flex-row">
        <img v-for="item in itemTree.components" :key="item.item.id" :src="item.item.iconPath" class="w-16 h-16 mr-2" />
      </div>
      <div v-html="item.description"></div>
      <div>{{ item.priceTotal }} Po</div>
    </div>
  </template>
  
  <script lang="ts">
  import { Item } from "@/@types/item";
import { ItemTree } from "@/@types/item_tree";
import { getItemTree } from "@/helpers/item_helper";
  import store from "@/store";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "ItemView",
    computed: {
      item(): Item {
        return store.getters.getItemById(this.$route.params.id);
      },
      itemTree(): ItemTree {
        return getItemTree(this.item);
      },
    },
  });
  </script>