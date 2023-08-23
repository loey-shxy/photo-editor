import { LINE_STYLES } from '@/common/constants'
import { useLineStore } from '@/store/line'
const lineStore = useLineStore()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useLine() {
  const drawLine = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvas.style.cursor = 'crosshair'
    let start = false
    let startX = 0, startY = 0, endX = 0, endY = 0;
    
    canvas.onmousedown = (ed: MouseEvent) => {
      start = true
      ctx.beginPath()
      startX = ed.offsetX
      startY = ed.offsetY
      ctx.moveTo(ed.offsetX, ed.offsetY)

      ctx.strokeStyle = lineStore.lineColor
      ctx.lineWidth = lineStore.lineWidth
      ctx.setLineDash([8, lineStore.lineStyle === LINE_STYLES.DASHED.v ? 4 : 0])
      ctx.lineCap = lineStore.lineCap as CanvasLineCap

      canvas.onmousemove = (em: MouseEvent) => {
        if (start) {
          ctx.lineTo(em.offsetX, em.offsetY)
          endX = em.offsetX
          endY = em.offsetY
          ctx.stroke()
        }
      }

      canvas.onmouseup = () => {
        start = false
        canvasStore.canvasList[canvasStore.canvasList.length-1].line = {
          sx: startX,
          sy: startY,
          ex: endX,
          ey: endY
        }
      }
    }
  }

  return {
    drawLine
  }
}
