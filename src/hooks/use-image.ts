import type { UploadFile, UploadProps, UploadInstance } from 'element-plus'
import { Image } from '@/interface/canvas'
import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import useMove from './use-move'

export default function useImage() {
  const cav = shallowRef<HTMLCanvasElement>()
  const uid = ref<number>(0)
  const uploadRef = ref<UploadInstance>()
  let image = reactive<Image>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    path: '',
    img: null
  })
  const { mousemove } = useMove<Image>(image, isInImage, draw)

  const drawImage = (file: Blob) => {
    uid.value = Date.now()
    canvasStore.push({
      uid: uid.value
    })
    
    nextTick(() => {
      cav.value = document.querySelector(`#canvas${uid.value}`) as HTMLCanvasElement
      cav.value.width = canvasStore.width
      cav.value.height = canvasStore.height

      const canvas = cav.value as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      newDraw(canvas, ctx, file)
      mousemove(canvas, ctx)
    })
  }

  /**
   * @description 图片加载
   * @param canvas 
   * @param ctx 
   * @param file 
   */
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
        const width = 100 // 图片宽度固定为100px
        const height = (width / img.width) * img.height
        image.x = 0
        image.y = 0
        image.width = width
        image.height = height
        image.path = img.src
        image.img = img

        draw(canvas, ctx, image)
        const index = canvasStore.canvasList.findIndex(item => item.uid === uid.value)
        if (index >= 0) {
          canvasStore.splice(index, {
            ...canvasStore.canvasList[index],
            image: image
          })
        }
      }
    }
  }

  /**
   * @description 绘制图像
   * @param canvas 
   * @param ctx 
   * @param image 
   */
  function draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    image: Image
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image.img as HTMLImageElement, image.x, image.y, image.width, image.height)
  }


  /**
   * 图片导入
   * @param uploadFile 
   * @returns 
   */
  const uploadChange: UploadProps['onChange'] = (uploadFile: UploadFile) => {
    if (!/image\/\w+/.test(uploadFile.raw?.type as string)) {
      ElMessage({
        message: '请上传图片！',
        type: 'warning'
      })
      uploadRef.value?.clearFiles()
      return
    }
    
    drawImage(uploadFile.raw as Blob)
  }

  /**
   * @description 判断鼠标按下位置是否在图片内部
   * @param evt 
   * @returns 
   */
  function isInImage(evt: MouseEvent) {
    return evt.offsetX > image.x && evt.offsetX < image.x + image.width 
            && image.y < evt.offsetY && evt.offsetY < image.y + image.height
  }

  return {
    uploadRef,
    uploadChange
  }
}

