import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

const startX = 10
const startY = 10
export default function useImage() {
  const drawImage = (file: File) => {
    const uid = Date.now()
    canvasStore.push({ uid })

    nextTick(() => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
        const canvas = document.querySelector(`#canvas${uid}`) as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        
        let filePath = '', cavImgW = 0, cavImgH = 0, mousedown = 0

        const img = new Image()
        img.src = this.result as string
        filePath = this.result as string

        img.onload = function(this: any) {
          let scale = 1
          if (this.width > canvasStore.width || this.height > canvasStore.height) {
            if (this.width > this.height) {
              scale = (canvasStore.width - startX * 2) / this.width
            } else {
              scale = (canvasStore.height - startY * 2) / this.height
            }
          }
          cavImgW = this.width * scale
          cavImgH = this.height * scale
          ctx.drawImage(img, startX, startY, cavImgW, cavImgH)

          const index = canvasStore.canvasList.findIndex(item => item.uid === uid)
          if (index >= 0) {
            canvasStore.splice(index, {
              ...canvasStore.canvasList[index],
              file: {
                path: filePath,
                width: cavImgW,
                height: cavImgH
              }
            })
          }
        }

        // 选中图片
        canvas.onmousedown = () => {
          if (!mousedown) {
            ctx.closePath()
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.rect(startX, startY, cavImgW , cavImgH)
            ctx.stroke()
  
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.arc(startX, startY, 2, 0, Math.PI * 2)
            ctx.stroke()
            
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.arc(startX, cavImgH + startY, 2, 0, Math.PI * 2)
            ctx.stroke()
  
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.arc(cavImgW + startX, startY, 2, 0, Math.PI * 2)
            ctx.stroke()
  
            ctx.beginPath()
            ctx.strokeStyle = '#333'
            ctx.arc(cavImgW + startX, cavImgH + startY, 2, 0, Math.PI * 2)
            ctx.stroke()

            mousedown++
          }

          canvas.onmousemove = (em: MouseEvent) => {
            if (mousedown) {
              
            }
          }
        }
      }
    })
  }

  return {
    drawImage
  }
}