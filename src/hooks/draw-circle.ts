import { ICircle } from '@/interface/canvas'
import { LINE_STYLES } from '@/common/constants'
import { isEmpty } from 'lodash'

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useCircle() {
  let circle = {} as ICircle
  const drawCircle = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    canvas.style.cursor = 'crosshair'
    let start = false, startX = 0, startY = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.onmousedown = (ed: MouseEvent) => {
      start = true
      startX = ed.offsetX
      startY = ed.offsetY

      canvas.onmousemove = (em: MouseEvent) => {
        if (start) {
          const radius = Math.sqrt(Math.pow(em.offsetX - startX, 2) + Math.pow(em.offsetY - startY, 2))
          circle = {
            x: startX,
            y: startY,
            radius,
            startAngle: 0,
            endAngle: Math.PI * 2,
            bw: formStore.borderWidth,
            bc: formStore.borderColor,
            bs: formStore.borderStyle,
            fc: formStore.fillColor,
            anticlockwise: true
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          redraw()
          ctx.beginPath()
          ctx.strokeStyle = circle.bc
          ctx.lineWidth = circle.bw
          ctx.setLineDash([8, circle.bs === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.fillStyle = circle.fc as string
          ctx.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle, circle.anticlockwise)
          ctx.fill()
          ctx.stroke()
        }
      }
    }

    canvas.onmouseup = () => {
      start = false
      const uid = Date.now()
      canvasStore.push({ uid, circle })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextTick(() => {
        redraw()
      })
    }
  }

  const redraw = () => {
    canvasStore.canvasList.forEach(item => {
      if (!isEmpty(item) && !isEmpty(item.circle)) {
        const cav = document.querySelector(`#canvas${item.uid}`) as HTMLCanvasElement
        const context = cav.getContext('2d') as CanvasRenderingContext2D
        const circle = item.circle
        context.beginPath()
        context.strokeStyle = circle.bc
        context.lineWidth = circle.bw
        context.setLineDash([8, circle.bs === LINE_STYLES.DASHED.v ? 4 : 0])
        context.fillStyle = circle.fc as string
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true)
        context.fill()
        context.stroke()
      }
    })
  }

  return {
    drawCircle
  }
}