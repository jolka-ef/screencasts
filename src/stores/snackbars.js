import { defineStore } from 'pinia'

export const useSnackbarsStore = defineStore('snackbars', {
  state: () => ({
    snackbars: []
  }),
  actions: {
    setSnackbar(snackbar) {
      snackbar.color = snackbar.color || 'success'
      snackbar.showing = true
      this.snackbars = this.snackbars.concat(snackbar)
    }
  }
})
