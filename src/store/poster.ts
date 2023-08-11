import { defineStore } from 'pinia'
import { ICanvasSize } from '@/interface/canvas';

export const usePosterStore = defineStore('poster', {
  state: () => { 
    return {
      canvasSize: { width: 338, height: 600 }, // 画布大小
      brushColor: '#000', // 笔刷颜色
      backgroundColor: '#fff', // 画布背景颜色
      brushStyle: 'solid', // 笔刷类型
    }
  },
  actions: {
    // 修改画布大小
    changeSize(size: ICanvasSize) {
      this.canvasSize.width = size.width
      this.canvasSize.height = size.height
    },

    // 修改笔刷颜色
    changeColor(color: string) {
      this.brushColor = color
    },

    // 修改背景颜色
    changeBgColor(color: string) {
      this.backgroundColor = color
    },

    // 修改笔刷类型
    changeBrushStyle(style: string) {
      this.brushStyle = style
    }
  }
})