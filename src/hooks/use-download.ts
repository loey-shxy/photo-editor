import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

export default function useDownload() {
  /**
   * @description base64转换为文件
   * @param code base64代码
   * @returns 
   */
  const base64Img2Blob = (code: string) => {
    const parts = code.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; i++) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: contentType})
  }

  /**
   * @description 下载文件
   * @param imgData 
   */
  const downloadImage = (imgData: string) => {
    const alink = document.createElement('a')
    const fileName = `${Date.now()}.png`
    const blob = base64Img2Blob(imgData)
    alink.download = fileName
    alink.href = URL.createObjectURL(blob)
    alink.click()
  }

  /**
   * @description 保存画布内容为图片
   */
  const saveFile = () => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    canvas.width = canvasStore.width
    canvas.height = canvasStore.height
    canvasStore.canvasList.forEach(item => {
      const cav = document.querySelector(`#canvas${item.uid}`)
      ctx.drawImage(cav as CanvasImageSource, 0, 0, canvas.width, canvas.height)
    })

    let data: ImageData, compositeOperation: GlobalCompositeOperation
    data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    compositeOperation = ctx.globalCompositeOperation
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = canvasStore.backgroundColor ? canvasStore.backgroundColor : 'rgba(0,0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const imgData = canvas.toDataURL('image/png')
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.putImageData(data, 0, 0)
    ctx.globalCompositeOperation = compositeOperation

    downloadImage(imgData)
  }

  return {
    saveFile
  }
}