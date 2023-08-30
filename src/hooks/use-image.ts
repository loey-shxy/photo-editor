import type { UploadFile, UploadProps, UploadInstance } from 'element-plus'
import { Position } from '@/interface/canvas'
import { File } from '@/interface/canvas'
import { getDistance, getPosition } from '@/utils/position'
import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

const DRAG_STATUS = {
  IDLE: 0, // 拖拽开始
  DRAG_START: 1, // 拖拽中
  DRAGGING: 2 // 拖拽结束
}

export default function useImage() {
  const cav = shallowRef<HTMLCanvasElement>()
  let lastEvtPos = reactive<Position>({x: 0, y: 0}) // 计算偏移量坐标
  let offsetEvtPos = reactive<Position>({x: 0, y: 0}) // 偏移事件位置
  let scaleOffset = reactive<Position>({x: 0, y: 0}) // 缩放偏移
  const uid = ref<number>(0)
  const dragStatus = ref<number>(DRAG_STATUS.IDLE)
  const uploadRef = ref<UploadInstance>()
  let image = reactive<File>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    path: '',
    img: null
  })

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
  
      canvas.onmousedown = (ed: MouseEvent) => {
        // 判断鼠标按下点是否在图片内
        if (isInImage(ed)) {
          dragStatus.value = DRAG_STATUS.DRAG_START
          
          lastEvtPos = { x: ed.offsetX, y: ed.offsetY }
          offsetEvtPos = { x: ed.offsetX, y: ed.offsetY }
          moveImage(canvas, ctx)
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
        image = {
          x: 0,
          y: 0,
          width,
          height,
          path: img.src,
          img
        }
        draw(canvas, ctx, image)
        const index = canvasStore.canvasList.findIndex(item => item.uid === uid.value)
        if (index >= 0) {
          canvasStore.splice(index, {
            ...canvasStore.canvasList[index],
            file: image
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
  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    image: File
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image.img as HTMLImageElement, image.x, image.y, image.width, image.height)
  }

  /**
   * @description 移动图片
   * @param canvas 
   * @param ctx 
   */
  const moveImage = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    canvas.onmousemove = (em: MouseEvent) => {
      if (!isInImage(em)) {
        canvas.style.cursor = ''
      } else {
        canvas.style.cursor = 'move'
      }
      const position = getPosition(em)
      // 如果第一次距离和第二次之间大于5，代表真正的拖动（防抖）
      if (dragStatus.value === DRAG_STATUS.DRAG_START && getDistance(position, lastEvtPos) > 5) {
        dragStatus.value = DRAG_STATUS.DRAGGING
        offsetEvtPos = position // 更新偏移事件位置
      } else if (dragStatus.value === DRAG_STATUS.DRAGGING) {
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

  const isInImage = (evt: MouseEvent) => {
    return evt.offsetX > image.x && evt.offsetX < image.x + image.width 
            && image.y < evt.offsetY && evt.offsetY < image.y + image.height
  }

  return {
    uploadRef,
    uploadChange
  }
}

