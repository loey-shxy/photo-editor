import { File } from '@/interface/canvas'
import { getDistance } from '@/utils/position'
import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

const DRAG_STATUS = {
  IDLE: 0, // 拖拽开始
  DRAG_START: 1, // 拖拽中
  DRAGGING: 2 // 拖拽结束
}

export default function useImage() {
  let uid = 0, 
      dragStatus = DRAG_STATUS.IDLE,
      image: File = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        path: '',
        img: null
      },
      lastEvtPos: { x: number, y: number }, // 计算偏移量坐标
      offsetEvtPos: { x: number, y: number} // 偏移事件位置

  const drawImage = (
    file: Blob
  ) => {
    uid = Date.now()
    canvasStore.push({
      uid
    })
    nextTick(() => {
      const canvas = document.querySelector(`#canvas${uid}`) as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

      newDraw(canvas, ctx, file)

      canvas.onmousedown = (ed: MouseEvent) => {
        if (ed.offsetX > image.x && ed.offsetX < image.x + image.width 
          && image.y < ed.offsetY && ed.offsetY < image.y + image.height) {
          dragStatus = DRAG_STATUS.DRAG_START
          
          lastEvtPos = { x: ed.offsetX, y: ed.offsetY }
          offsetEvtPos = { x: ed.offsetX, y: ed.offsetY }
          moveImage(canvas, ctx)
        }
      }
      canvas.onmouseup = () => {
        dragStatus = DRAG_STATUS.IDLE
        canvas.style.cursor = ''
      }

      canvas.onmouseout = () => {
        dragStatus = DRAG_STATUS.IDLE
        canvas.style.cursor = ''
      }
    })
  }

  const newDraw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    file: Blob
  ) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      const img = new Image()
      img.src = this.result as string

      img.onload = () => {
        const width = 100
        const height = (width / img.width) * img.height
        image = {
          x: 0,
          y: 0,
          width,
          height,
          path: img.src,
          img
        }
        draw(canvas, ctx, image)
        const index = canvasStore.canvasList.findIndex(item => item.uid === uid)
        if (index >= 0) {
          canvasStore.splice(index, {
            ...canvasStore.canvasList[index],
            file: image
          })
        }
      }
    }
  }

  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    image: File
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image.img as HTMLImageElement, image.x, image.y, image.width, image.height)
  }

  const moveImage = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    canvas.onmousemove = (em: MouseEvent) => {
      canvas.style.cursor = 'move'
      const position = getPosition(em)
      if (dragStatus === DRAG_STATUS.DRAG_START && getDistance(position, lastEvtPos) > 5) {
        dragStatus = DRAG_STATUS.DRAGGING
        offsetEvtPos = position
      } else if (dragStatus === DRAG_STATUS.DRAGGING) {
        const [dx, dy] = [position.x - offsetEvtPos.x, position.y - offsetEvtPos.y]

        image = {
          ...image,
          x: image.x + dx,
          y: image.y + dy
        }

        draw(canvas, ctx, image)
        offsetEvtPos = position
      }
    }
  }

  return {
    drawImage
  }
}

const getPosition = (e: MouseEvent) => {
  return {
    x: e.offsetX,
    y: e.offsetY
  }
}