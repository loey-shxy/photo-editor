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
  const rectangle = ref<IRectangle>()
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

  const drawRectangle = () => {
    const canvas = cav.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.style.cursor = 'crosshair'
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.onmousedown = (ed: MouseEvent) => {
      uid.value = Date.now()
      start.value = true
      const [startX, startY] = [ed.offsetX, ed.offsetY]
      
      canvas.onmousemove =  (em: MouseEvent) => {
        if (start.value) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          redraw(uid.value)
          rectangle.value = {
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
          ctx.setLineDash([8, rectangle.value.bs === LINE_STYLES.DASHED.v ? 4 : 0])
          ctx.strokeStyle = rectangle.value.bc
          ctx.fillStyle = rectangle.value.fc ? rectangle.value.fc as string : 'rgba(0,0,0,0)'
          ctx.lineWidth = rectangle.value.bw
          ctx.rect(rectangle.value.x, rectangle.value.y, rectangle.value.w, rectangle.value.h)
          ctx.fillRect(rectangle.value.x, rectangle.value.y, rectangle.value.w, rectangle.value.h)
          ctx.stroke()
          
        }
      }
    }

    canvas.onmouseup = () => {
      start.value = false
      canvasStore.push({ uid: uid.value, rectangle: rectangle.value })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextTick(() => {
        redraw(uid.value)
      })
    }
  }

  const redraw = (uid: number) => {
    canvasStore.canvasList.forEach(item => {
      if (!isEmpty(item) && !isEmpty(item.rectangle) && item.uid === uid)  {
        const canvas = document.querySelector(`#canvas${item.uid}`) as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        const rect = item.rectangle
        context.beginPath()
        context.strokeStyle = rect.bc
        context.lineWidth = rect.bw
        context.setLineDash([8, rect.bs === LINE_STYLES.DASHED.v ? 4 : 0])
        context.fillStyle = rect.fc ? rect.fc as string : 'rgba(0,0,0,0)'
        context.rect(rect.x, rect.y, rect.w, rect.h)
        context.fillRect(rect.x, rect.y, rect.w, rect.h)
        context.stroke()
      }
    })
  }

  return {
    drawRectangle
  }
}