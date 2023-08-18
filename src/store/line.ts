import { defineStore } from 'pinia'

interface ILineStore {
  lineColor: string
  lineStyle: string
  lineWidth: number
  lineCap: string
}

export const useLineStore = defineStore('line', {
  state: (): ILineStore => { 
    return {
      lineColor: '#000', // 笔刷颜色
      lineStyle: 'solid', // 笔刷类型
      lineWidth: 1, // 笔刷大小
      lineCap: '', // 鼻尖形状
    }
  },
  actions: {
    // 修改笔刷颜色
    changeColor(color: string) {
      this.lineColor = color
    },

    // 修改笔刷类型
    changeLineStyle(style: string) {
      this.lineStyle = style
    },

    // 修改笔刷大小
    changeLineWidth(width: number) {
      this.lineWidth = width
    },

    // 修改笔尖形状
    changeLineCap(cap: string) {
      this.lineCap = cap
    }
  }
})