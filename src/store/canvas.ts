import { defineStore } from 'pinia'
import { ICanvasSize } from '@/interface/canvas';

export const useCanvasStore = defineStore('canvas', {
  state: () => { 
    return {
      canvasSize: { width: 338, height: 600 }, // 画布大小
      backgroundColor: '#fff', // 画布背景颜色
    }
  },
  actions: {
    // 修改画布大小
    changeSize(size: ICanvasSize) {
      this.canvasSize.width = size.width
      this.canvasSize.height = size.height
    },

    // 修改背景颜色
    changeBgColor(color: string) {
      this.backgroundColor = color
    }
  }
})