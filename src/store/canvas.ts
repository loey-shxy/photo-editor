import { defineStore } from 'pinia'
import { ICanvasSize, Canvas } from '@/interface/canvas';

interface ICanvasStore {
  width: number,
  height: number,
  backgroundColor: string,
  canvasList: Canvas[]
}

export const useCanvasStore = defineStore('canvas', {
  state: (): ICanvasStore => { 
    return {
      width: 338, 
      height: 600, // 画布大小
      backgroundColor: '#fff', // 画布背景颜色
      canvasList: []
    }
  },
  actions: {
    // 修改画布大小
    changeSize(size: ICanvasSize) {
      this.width = size.width
      this.height = size.height
    },

    // 修改背景颜色
    changeBgColor(color: string) {
      this.backgroundColor = color
    },

    // 添加画布
    push(canvas: Canvas) {
      this.resetSelected()
      this.canvasList.push({
        ...canvas,
        lock: false,
        selected: true,
        name: `图层${this.canvasList.length+1}`
      })
    },

    // 更新画布列表
    splice(index: number, canvas?: Canvas) {
      if (!canvas) {
        this.canvasList.splice(index, 1)
      } else {
        this.canvasList.splice(index, 1, canvas)
      }
    },

    resetSelected() {
      this.canvasList.forEach(item => {
        item.selected = false
      })
    },

    changeSelected(canvas: Canvas, selected: boolean) {
      const index = this.canvasList.findIndex(item => item.uid === canvas.uid)
      this.resetSelected()
      if (index >= 0) {
        this.splice(index, {
          ...canvas,
          selected
        })
      }
    }
  }
})