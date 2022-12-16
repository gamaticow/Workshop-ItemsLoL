import { createStore } from "vuex";
import { Item } from "@/@types/item";
import { api, baseURL } from "@/helpers/api";

interface State {
  items: Item[];
  loading: boolean;
  error: boolean;
  score: number;
  streak: number;
}

export default createStore({
  state: {
    items: [],
    loading: false,
    error: false,
    score: 0,
    streak: 0,
  } as State,
  getters: {
    filtredItems(state) {
      return state.items
        .filter((item) => item.inStore)
        .sort((a, b) => a.priceTotal - b.priceTotal);
    },
    getItemById(state) {
      return (id: number) => {
        const item = state.items.find((item) => item.id == id);
        return item;
      };
    },
    getCraftableItems(state) {
      return state.items.filter((item) => item.inStore).filter((item) => item.from.length > 0);
    },
    getComponents(state) {
      return state.items.filter((item) => item.inStore).filter((item) => item.to.length > 0);
    },
  },
  mutations: {
    setItems(state, items: Item[]) {
      state.items = items;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: boolean) {
      state.error = error;
    },
    incrementScore(state) {
      state.score++;
      state.streak++;
    },
    resetStreak(state) {
      state.streak = 0;
    }
  },
  actions: {
    fetchItems({ commit }) {
      console.log("fetchItems");
      commit("setLoading", true);
      api
        .get("/items.json")
        .then((response) => {
          let items: Item[] = response.data;

          items = items.map((item) => {
            item.iconPath =
              baseURL + item.iconPath.split("assets")[1].toLowerCase();
            return item;
          });

          commit("setItems", items);
          commit("setLoading", false);
        })
        .catch(() => {
          commit("setError", true);
          commit("setLoading", false);
        });
    },
  },
  modules: {},
});
