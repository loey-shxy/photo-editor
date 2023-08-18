import { defineStore } from 'pinia'

interface IPosterStore {
  activity: string
}

export const usePosterStore = defineStore('poster', {
  state: (): IPosterStore => { 
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