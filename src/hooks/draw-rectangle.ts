import { LINE_STYLES } from '@/common/constants'
import { IRectangle } from '@/interface/canvas'
import { useFormStore } from '@/store/form'
const formStore = useFormStore()

import { useCanvasStore } from '@/store/canvas'
import { isEmpty } from 'lodash'
const canvasStore = useCanvasStore()

export default function useRectangle() {
  /**
   * @description 绘制矩形
   * @param canvas 
   * @param ctx
   */
  let rectangle = {} as IRectangle
  const drawForm = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    canvas.style.cursor = 'crosshair'
    let start = false, startX = 0, startY = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.onmousedown = (ed: MouseEvent) => {
      start = true
      startX = ed.offsetX
      startY = ed.offsetY
      
      canvas.onmousemove =  (em: MouseEvent) => {
        if (start) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          redraw()
          rectangle = {
            x: startX,
            y: startY,
            w: em.offsetX - startX,
            h: em.offsetY - startY,
            bs: formStore.borderStyle,
            bc: formStore.borderColor,
            fc: formStore.fillColor as string,
            bw: formStore.borderWidth
          }

          ctx.beginPath()
          ctx.setLineDash([8, rectangle.bs === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.strokeStyle = rectangle.bc
          ctx.fillStyle = rectangle.fc ? rectangle.fc as string : 'rgba(0,0,0,0)'
          ctx.lineWidth = rectangle.bw
          ctx.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h)
          ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h)
          ctx.stroke()
          
        }
      }
    }

    canvas.onmouseup = () => {
      start = false
      const uid = Date.now()
      canvasStore.push({ uid, rectangle })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextTick(() => {
        redraw()
      })
    }
  }

  const redraw = () => {
    canvasStore.canvasList.forEach(item => {
      if (!isEmpty(item) && !isEmpty(item.rectangle))  {
        const cav = document.querySelector(`#canvas${item.uid}`) as HTMLCanvasElement
        const context = cav.getContext('2d') as CanvasRenderingContext2D
        const rect = item.rectangle
        context.beginPath()
        context.strokeStyle = rect.bc
        context.lineWidth = rect.bw
        context.setLineDash([8, rect.bs === LINE_STYLES.DASHED.v ? 4 : 0])
        context.fillStyle = rectangle.fc ? rectangle.fc as string : 'rgba(0,0,0,0)'
        context.rect(rect.x, rect.y, rect.w, rect.h)
        context.fillRect(rect.x, rect.y, rect.w, rect.h)
        context.stroke()
      }
    })
  }

  return {
    drawForm
  }
}