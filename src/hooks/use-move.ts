import { Position } from '@/interface/canvas'
import { getDistance, getPosition } from '@/utils/position'
import { DRAG_STATUS } from '@/common/constants'

export default function useMove<T extends Position>(
  target: T,
  inTarget: Function, // 判断鼠标按下的位置是否在目标内
  draw: Function // 重新绘制
) {
  let lastEvtPos = reactive<Position>({x: 0, y: 0}) // 计算偏移量坐标
  let offsetEvtPos = reactive<Position>({x: 0, y: 0}) // 偏移事件位置
  const dragStatus = ref<number>(DRAG_STATUS.IDLE)

  const mousemove = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvas.onmousedown = (ed: MouseEvent) => {
      if (inTarget(ed)) {
        dragStatus.value = DRAG_STATUS.DRAG_START
  
        lastEvtPos = {x: ed.offsetX, y: ed.offsetY}
        offsetEvtPos = {x: ed.offsetX, y: ed.offsetY}
        move(canvas, ctx)
      }
    }
  
    canvas.onmouseup = () => {
      dragStatus.value = DRAG_STATUS.IDLE
      canvas.style.cursor = ''
    }
  
    canvas.onmouseout = () => {
      dragStatus.value = DRAG_STATUS.IDLE
      canvas.style.cursor = ''
    }
  }

  const move = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvas.onmousemove = (em: MouseEvent) => {
      if (!inTarget(em)) {
        canvas.style.cursor = ''
      } else {
        canvas.style.cursor = 'move'
      }

      const mousePosition = getPosition(em)
      if (dragStatus.value === DRAG_STATUS.DRAG_START && getDistance(mousePosition, lastEvtPos) > 5) {
        dragStatus.value = DRAG_STATUS.DRAGGING
        offsetEvtPos = mousePosition
      } else if (dragStatus.value === DRAG_STATUS.DRAGGING) {
        const [dx, dy] = [mousePosition.x - offsetEvtPos.x, mousePosition.y - offsetEvtPos.y]

        target.x += dx
        target.y += dy

        draw(canvas, ctx, target)
        offsetEvtPos = mousePosition
      }
    }
  }

  return {
    mousemove
  }
}