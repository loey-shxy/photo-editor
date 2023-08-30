import { ICircle } from '@/interface/canvas'
import { LINE_STYLES } from '@/common/constants'
import { isEmpty } from 'lodash'

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useCircle() {
  let circle = ref<ICircle>()
  const cav = shallowRef<HTMLCanvasElement>()
  const uid = ref<number>(0)
  const start = ref<boolean>(false)

  onMounted(() => {
    nextTick(() => {
      cav.value = document.querySelector('#canvas') as HTMLCanvasElement
      cav.value.width = canvasStore.width
      cav.value.height = canvasStore.height
    })
  })

  const drawCircle = () => {
    const canvas = cav.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    canvas.style.cursor = 'crosshair'
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.onmousedown = (ed: MouseEvent) => {
      start.value = true
      uid.value = Date.now()
      const [startX, startY] = [ed.offsetX, ed.offsetY]
      canvas.onmousemove = (em: MouseEvent) => {
        if (start.value) {
          const radius = Math.sqrt(Math.pow(em.offsetX - startX, 2) + Math.pow(em.offsetY - startY, 2))
          circle.value = {
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
          redraw(uid.value)
          ctx.beginPath()
          ctx.strokeStyle = circle.value.bc
          ctx.lineWidth = circle.value.bw
          ctx.setLineDash([8, circle.value.bs === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.fillStyle = circle.value.fc ? circle.value.fc as string : 'rgba(0,0,0,0)'
          ctx.arc(circle.value.x, circle.value.y, circle.value.radius, circle.value.startAngle, circle.value.endAngle, circle.value.anticlockwise)
          ctx.fill()
          ctx.stroke()
        }
      }
    }

    canvas.onmouseup = () => {
      start.value = false
      canvasStore.push({ uid: uid.value, circle: circle.value })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextTick(() => {
        redraw(uid.value)
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