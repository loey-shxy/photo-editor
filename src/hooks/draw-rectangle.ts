import { LINE_STYLES } from '@/common/constants'
import { IRectangle } from '@/interface/canvas'
import { useFormStore } from '@/store/form'
const formStore = useFormStore()

/**
 * https://blog.csdn.net/Sunshine_YXJ/article/details/108216971
 */
export default function useRectangle() {
  let startX = 0
  let startY = 0 
  const newDraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, list: IRectangle[]) =>  {

  }

  const judgeDraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, list: IRectangle[], i: number) => {

  }

  const changeDraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, list: IRectangle[], i: number, site: number) => {

  }
  const draw = (
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    list: IRectangle[], 
    i = undefined
  ) => {
    ctx.strokeStyle = formStore.borderColor
    ctx.lineWidth = formStore.borderWidth
    ctx.setLineDash([8, formStore.borderStyle === LINE_STYLES.DASHED.v ? 4 : 0])

    canvas.onmousemove = (em: MouseEvent) => {

      startX = em.offsetX
      startY = em.offsetY
  
      let iem: undefined | number = undefined // 鼠标移动时临时存储当前鼠标所在矩形的下标
  
      if (!list.length) {
        // 绘制新矩形
        newDraw(canvas, ctx, list)
      } else if (i === undefined) { // 已有矩形无选中
        // 判断鼠标位置
        list.forEach((value, index) => {
          // 鼠标在右下方向生成的矩形中
          if (value.w > 0 && value.h > 0 
            && startX > value.x && startX < value.x + value.w 
            && startY > value.y && startY < value.y + value.h
          ) {
            iem = index
            judgeDraw(canvas, ctx, list, iem)
          }
          // 鼠标在左下方向生成的矩形中
          if (value.w < 0 && value.h > 0
            && startX < value.x && startX > value.x + value.w
            && startY > value.y && startY < value.y + value.h
          ) {
            iem = index
            judgeDraw(canvas, ctx, list, iem)
          }
          // 鼠标在右上方向生成的矩形中
          if (value.w > 0 && value.h < 0
            && startX > value.x && startX < value.x + value.w
            && startY < value.y && startY > value.y + value.h
          ) {
            iem = index
            judgeDraw(canvas, ctx, list, iem)
          }
          // 鼠标在左上方向生成的矩形中
          if (value.w < 0 && value.h < 0 
            && startX < value.x && startX > value.x + value.w 
            && startY < value.y && startY > value.y + value.h
          ) {
            iem = index
            judgeDraw(canvas, ctx, list, iem)
        }
  
          if (iem === undefined) {
            // 鼠标不在矩形中
            newDraw(canvas, ctx, list)
          }
        })
      } else {
        for (let index = 0; index < list.length; index++) {
          let value = list[index]
          if (startX < value.x + 5 && startX > value.x - 5 && startY < value.y + 5 && startY > value.y - 5) {
            if (index === i) {
              
            }
          }
        }
      }
    }
  }

  /**
   * @description 重绘所有矩形
   * @param canvas 
   * @param ctx 
   * @param list 
   * @param i 
   */
  const redraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, list: IRectangle[], i = null) => {
    ctx.setLineDash([8, formStore.borderStyle === LINE_STYLES.DASHED.v ? 4 : 0])
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制未选中部分
    list.forEach((value, index) => {
      if (i === null || index !== i) {
        ctx.beginPath()
        ctx.strokeStyle = formStore.borderColor
        ctx.lineWidth = formStore.borderWidth
        ctx.setLineDash([8, formStore.borderStyle === LINE_STYLES.DASHED.v ? 4 : 0])
        ctx.fillStyle = formStore.fillColor
        ctx.rect(value.x, value.y, value.w, value.h)
        ctx.fillRect(value.x, value.y, value.w, value.h)
        ctx.stroke()
      }
    })

    // 绘制已选中部分
    list.forEach((value, index) => {
      if (index === i) {
        // 绘制矩形
        ctx.beginPath()
        ctx.setLineDash([8, formStore.borderStyle === LINE_STYLES.DASHED.v ? 4 : 0])
        ctx.lineWidth = formStore.borderWidth
        ctx.strokeStyle = '#f00'
        ctx.rect(value.x, value.y, value.w, value.h)
        ctx.fillStyle = 'rgba(102, 102, 102, 0.2)'
        ctx.fillRect(value.x, value.y, value.w, value.h)
        ctx.stroke()
        // 绘制四个角的圆圈
        ctx.beginPath()
        ctx.strokeStyle = '#f00'
        ctx.arc(value.x, value.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#f00'
        ctx.fill() // 绘制起点实心圆
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(value.x, value.y + value.h, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#f00'
        ctx.fill() // 绘制起点纵向实心圆
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(value.x + value.w, value.y + value.h, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#f00'
        ctx.fill() // 绘制起点横向实心圆
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(value.x + value.w, value.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#f00'
        ctx.fill()
        ctx.stroke()
      }
    })
  }

  /**
   * @description 重置按键监听，防止选中取消后仍可删除
   * @param canvas 
   * @param ctx 
   * @param list 
   */
  const delDraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, list: IRectangle[], index = null) => {
    if (index === null) {
      canvas.onkeydown = () => {
        return false
      } 
    } else {
      canvas.onkeydown = (k: KeyboardEvent) => {
        const key = k.keyCode
        if (key === 8 && index !== null) {
          if (list.length) {
            list.splice(index, 1)
            redraw(canvas, ctx, list)
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
          }

          delDraw(canvas, ctx, list, null)
          redraw(canvas, ctx, list)
          draw(canvas, ctx, list)
        }
      }
    }
  }
}