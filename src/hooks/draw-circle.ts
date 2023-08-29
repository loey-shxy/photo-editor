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
    let uid: number, start = false, startX = 0, startY = 0;
    canvas.style.cursor = 'crosshair'
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.onmousedown = (ed: MouseEvent) => {
      start = true
      startX = ed.offsetX
      startY = ed.offsetY
      uid = Date.now()

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
            fc: formStore.fillColor as string,
            anticlockwise: true
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          redraw(uid)
          ctx.beginPath()
          ctx.strokeStyle = circle.bc
          ctx.lineWidth = circle.bw
          ctx.setLineDash([8, circle.bs === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.fillStyle = circle.fc ? circle.fc as string : 'rgba(0,0,0,0)'
          ctx.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle, circle.anticlockwise)
          ctx.fill()
          ctx.stroke()
        }
      }
    }

    canvas.onmouseup = () => {
      start = false
      canvasStore.push({ uid, circle })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextTick(() => {
        redraw(uid)
      })
    }
  }

  const redraw = (uid: number) => {
    canvasStore.canvasList.forEach(item => {
      if (!isEmpty(item) && !isEmpty(item.circle) && item.uid === uid) {
        const cav = document.querySelector(`#canvas${item.uid}`) as HTMLCanvasElement
        const context = cav.getContext('2d') as CanvasRenderingContext2D
        const circle = item.circle
        context.beginPath()
        context.strokeStyle = circle.bc
        context.lineWidth = circle.bw
        context.setLineDash([8, circle.bs === LINE_STYLES.DASHED.v ? 4 : 0])
        context.fillStyle = circle.fc ? circle.fc as string : 'rgba(0,0,0,0)'
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