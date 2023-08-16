import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => {
    return {
      form: '',
      borderStyle: '',
      borderWidth: 1,
      borderColor: '#000',
      fillColor: '#fff'
    }
  },

  actions: {
    // 修改形状
    changeForm(form: string) {
      this.form = form
    },
    // 修改边框线条样式
    changeBorderStyle(style: string) {
      this.borderStyle = style
    },
    // 修改边框大小
    changeBorderWidth(width: number) {
      this.borderWidth = width
    },
    // 修改边框颜色
    changeBorderColor(color: string) {
      this.borderColor = color
    },
    // 修改填充颜色
    changeFillColor(color: string) {
      this.fillColor = color
    }
  }
})