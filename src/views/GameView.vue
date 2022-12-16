<template>
    <div class="text-white p-10 flex justify-center" v-if="item">
      <div class="flex flex-col items-center">
        <div class="flex flex-row mb-5">
          <div v-for="(component, index) of guess" :key="index" class="mx-1">
            <img v-if="component" class="w-16 h-16 cursor-pointer" :class="index==selected ? 'border border-solid border-red-600' : ''" @click="selected=index" :src="component.iconPath" />
            <div v-else class="w-16 h-16 bg-slate-300 text-black text-[40px] text-center cursor-pointer" :class="index==selected ? 'border border-solid border-red-600' : ''" @click="selected=index">?</div>
          </div>
        </div>
        <img class="w-16 h-16 mb-5" :src="item.iconPath" />
        <div class="relative">
          <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" @click="validate">
            Valider
          </button>
          <span v-if="result !== null" class="absolute mt-2 ml-2" :class="resultClass">{{ resultMessage }}</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 pl-10">
      <img v-for="item of items" :key="item.id" class="w-16 h-16 cursor-pointer" :src="item.iconPath" @click="guess[selected]=item; selected = (selected+1)%guess.length" />
    </div>
  </template>
  
  <script lang="ts">
  import { Item } from "@/@types/item";
  import store from "@/store";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "GameView",
    data() {
      return {
        item: null as Item|null,
        components: [] as Item[],
        guess: [] as (Item | null)[],
        selected: 0 as number,
        result: null as boolean|null,
      };
    },
    computed: {
      loading() {
        return store.state.loading;
      },
      items() {
        return store.getters.getComponents;
      },
      resultMessage() {
        if (this.result) {
          return 'Bravo'
        } else {
          return 'Dommage'
        }
      },
      resultClass() {
        if (this.result) {
          return 'text-green-500'
        } else {
          return 'text-red-500'
        }
      },
    },
    methods: {
      chooseItem() {
        const items = store.getters.getCraftableItems;
        const index = Math.floor(Math.random() * items.length)
        this.item = items[index]
        this.selected = 0
        this.components = []
        this.guess = []
        for (let component of items[index].from) {
          this.components.push(store.getters.getItemById(component))
          this.guess.push(null)
        }
      },
      validate() {
        let result = true
        if (this.guess.includes(null)) {
          result = false
        } else {
          // Check if the guess is correct by comparing the ids of the components and ignore the order
          const guessIds = this.guess.filter((item) => item).map((item) => item as Item).map((item) => item.id).sort()
          const componentIds = this.components.map((item) => item.id).sort()
          for (let i = 0; i < guessIds.length; i++) {
            if (guessIds[i] !== componentIds[i]) {
              result = false
              break
            }
          }
        }

        this.result = result

        if(result) {
          // Increment the score in the store
          store.commit('incrementScore')
        } else {
          // Reset the streak in the store
          store.commit('resetStreak')
        }

        setTimeout(() => {
          this.result = null
          this.chooseItem()
        }, 1000)
      }
    },
    watch: {
      loading() {
        if (!this.loading) {
          this.chooseItem()
        }
      },
    },
    beforeMount() {
      if(!this.loading) {
        this.chooseItem()
      }
    }
  });
  </script>