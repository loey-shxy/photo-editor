import { defineStore } from 'pinia'

export const usePosterStore = defineStore('poster', {
  state: () => { 
    return {
      activity: ''
    }
  },
  actions: {
    changeActivity(activity: string) {
      this.activity = activity
    }
  }
})