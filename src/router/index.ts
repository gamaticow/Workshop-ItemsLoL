import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ShopView from "@/views/ShopView.vue";
import ItemView from "@/views/ItemView.vue";
import GameView from "@/views/GameView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "shop",
    component: ShopView,
  },
  {
    path: "/item/:id",
    name: "item",
    component: ItemView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
