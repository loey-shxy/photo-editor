import { every } from 'lodash'
import { Canvas } from '@/interface/canvas'
import { LINE_STYLES } from '@/common/constants'

import { useLineStore } from '@/store/line'
const lineStore = useLineStore()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useLine() {
  const uid = ref<number>(0)
  const cav = shallowRef<HTMLCanvasElement>()
  const start = ref<boolean>(false)

  /**
   * @description 没有被选中的图层
   */
  const notSelected = computed(() => {
    return every(canvasStore.canvasList, item => !item.selected)
  })

  const drawLine = () => {
    let selectedCanvas = canvasStore.canvasList[canvasStore.canvasList.length-1]
    if (!notSelected) {
      selectedCanvas = canvasStore.canvasList.find(item => item.selected) as Canvas
    }
    if (!canvasStore.canvasList.length || selectedCanvas.rectangle || selectedCanvas.text || notSelected) {
      uid.value = Date.now()
      canvasStore.push({
        uid: uid.value,
      })
    }
    nextTick(() => {
      cav.value = document.querySelector(`#canvas${uid.value}`) as HTMLCanvasElement
      const canvas = cav.value as HTMLCanvasElement
      canvas.width = canvasStore.width
      canvas.height = canvasStore.height

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.style.cursor = 'crosshair'

      canvas.onmousedown = (ed: MouseEvent) => {
        start.value = true
        ctx.beginPath()
        const [startX, startY] = [ed.offsetX, ed.offsetY]
        ctx.moveTo(ed.offsetX, ed.offsetY)

        ctx.strokeStyle = lineStore.lineColor
        ctx.lineWidth = lineStore.lineWidth
        ctx.setLineDash([8, lineStore.lineStyle === LINE_STYLES.DASHED.v ? 4 : 0])
        ctx.lineCap = lineStore.lineCap as CanvasLineCap

        canvas.onmousemove = (em: MouseEvent) => {
          if (start.value) {
            ctx.lineTo(em.offsetX, em.offsetY)
            ctx.stroke()
          }
        }

        canvas.onmouseup = () => {
          start.value = false
          canvasStore.canvasList[canvasStore.canvasList.length-1].line = {
            x: startX,
            y: startY
          }
        }
      }
    })
  }

  return {
    drawLine
  }
}
