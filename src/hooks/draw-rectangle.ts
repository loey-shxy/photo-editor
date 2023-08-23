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
          ctx.beginPath()
          ctx.setLineDash([8, formStore.borderStyle === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.strokeStyle = formStore.borderColor
          ctx.fillStyle = formStore.fillColor
          ctx.lineWidth = formStore.borderWidth
          ctx.rect(startX, startY, em.offsetX - startX, em.offsetY - startY)
          ctx.fillRect(startX, startY, em.offsetX - startX, em.offsetY - startY)
          ctx.stroke()

          rectangle = {
            x: startX,
            y: startY,
            w: em.offsetX - startX,
            h: em.offsetY - startY,
            bs: formStore.borderStyle,
            bc: formStore.borderColor,
            fc: formStore.fillColor,
            bw: formStore.borderWidth
          }
        }
      }
    }

    canvas.onmouseup = () => {
      start = false
      const uid = Date.now()
      canvasStore.canvasPush({ uid, rectangle })
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
        const c = cav.getContext('2d') as CanvasRenderingContext2D
        const rect = item.rectangle
        c.beginPath()
        c.strokeStyle = rect.bc
        c.lineWidth = rect.bw
        c.setLineDash([8, rect.bs === LINE_STYLES.DASHED.v ? 4 : 0])
        c.fillStyle = rect.fc
        c.rect(rect.x, rect.y, rect.w, rect.h)
        c.fillRect(rect.x, rect.y, rect.w, rect.h)
        c.stroke()
      }
    })
  }

  return {
    drawForm
  }
}