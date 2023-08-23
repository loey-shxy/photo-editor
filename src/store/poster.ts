import { defineStore } from 'pinia'
import { IActivity } from '@/interface/canvas'

interface IPosterStore {
  activity: IActivity
}

export const usePosterStore = defineStore('poster', {
  state: (): IPosterStore => { 
    return {
      activity: null
    }
  },
  actions: {
    changeActivity(activity: IActivity) {
      this.activity = activity
    }
  }
})