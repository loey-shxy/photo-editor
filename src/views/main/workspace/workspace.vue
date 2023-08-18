<template>
    <div class="workspace">
      <canvas 
        class="canvas"
        :width="canvasStore.canvasSize.width"
        :height="canvasStore.canvasSize.height"
        :style="{backgroundColor: canvasStore.backgroundColor}"
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseup="mouseup"
      ></canvas>
    </div>
</template>
<script setup lang='ts'>
import { LINE_STYLES, OPERATION } from '@/common/constants'
// import { IRectangle } from '@/interface/canvas'

import { useLineStore } from '@/store/line'
const lineStore = useLineStore()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import { usePosterStore } from '@/store/poster'
const posterStore = usePosterStore()

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

const drawing = ref(false)
const point = reactive({
  x: 0,
  y: 0
})

// let rectangleList = reactive<IRectangle[]>(formStore.rectangleList)

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

/**
 * @description 获取画布对象
 */
const initCanvas = () => {
  canvas.value = document.querySelector('.canvas') as HTMLCanvasElement
  ctx.value = canvas.value.getContext('2d') as CanvasRenderingContext2D
}

// const resetDrawRectangle()

/**
 * @description 画线
 * @param e 
 */
const drawLine = (e: MouseEvent) => {
  if (drawing.value && ctx.value) {
    ctx.value.lineWidth = lineStore.lineWidth
    ctx.value.strokeStyle = lineStore.lineColor
    ctx.value.lineCap = lineStore.lineCap as CanvasLineCap
    ctx.value.lineTo(e.offsetX, e.offsetY)
    if (lineStore.lineStyle === LINE_STYLES.DASHED.v) {
      ctx.value.setLineDash([8, 4])
    }
    ctx.value.stroke()
  }
}

/**
 * @description 绘制多边形
 * @param e 
 */
const drawForm = (e: MouseEvent) => {
  if (drawing.value && ctx.value) {
    ctx.value.lineWidth = formStore.borderWidth
    ctx.value.strokeStyle = formStore.borderColor
    if (formStore.borderStyle === LINE_STYLES.DASHED.v) {
      ctx.value.setLineDash([8, 4])
    }
    ctx.value.rect(point.x, point.y, e.offsetX - point.x, e.offsetY - point.y)
    ctx.value.stroke()
  }
}

/**
 * @description 按下鼠标开启绘图
 * @param e 
 */
const mousedown = (e: MouseEvent) => {
  if (ctx.value) {
    drawing.value = true
    point.x = e.offsetX
    point.y = e.offsetY
    ctx.value.beginPath()
    ctx.value.moveTo(e.offsetX, e.offsetY)
  }
}

/**
 * @description 放开鼠标取消绘图状态
 */
const mouseup = () => {
  drawing.value = false
}

const mousemove = (e: MouseEvent) => {
  switch(posterStore.activity) {
    case OPERATION.BRUSH.v:
      drawLine(e)
      break
    case OPERATION.FORM.v: 
      drawForm(e)
      break
  }
}


</script>
  
<style lang="scss" scoped>
</style>