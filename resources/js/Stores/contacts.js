import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'contacts',
  state: () => ({
    stormy-pivotActive: null
  }),
  getters: {},
  actions: {
    setstormy-pivotId (name) {
      this.stormy-pivotActive = name
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
