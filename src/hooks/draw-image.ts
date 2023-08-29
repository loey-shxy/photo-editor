import { File } from '@/interface/canvas'
import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useImage() {
  let startX = 0, 
      startY = 0, 
      uid = 0, 
      isMoving = false,
      image = {} as File

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
        startX = ed.offsetX
        startY = ed.offsetY

        if (startX > image.x && startX < image.x + image.width 
          && image.y < startY && startY < image.y + image.height) {
          isMoving = true
          moveImage(canvas, ctx, startX, startY)
        }
      }
      canvas.onmouseup = () => {
        isMoving = false
      }

      canvas.onmouseout = () => {
        isMoving = false
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
      }

      const index = canvasStore.canvasList.findIndex(item => item.uid === uid)
      console.log(index, image);
      if (index >= 0) {
        canvasStore.splice(index, {
          ...canvasStore.canvasList[index],
          file: image
        })
      }
    }
  }

  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    image: File
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image.img, image.x, image.y, image.width, image.height)
  }

  const moveImage = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number
  ) => {
    canvas.onmousemove = (em: MouseEvent) => {
      if (!isMoving) {
        return
      }
      const [dx, dy] = [em.offsetX - startX, em.offsetY - startY]
      
      image = {
        ...image,
        x: image.x + dx,
        y: image.y + dy
      }
      
      draw(canvas, ctx, image)
    }

    canvas.onmouseup = () => {
      isMoving = false
    }
  }

  return {
    drawImage
  }
}