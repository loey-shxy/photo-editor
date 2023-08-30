<template>
    <div 
    class="workspace"
    :style="{
      backgroundColor: canvasStore.backgroundColor ? canvasStore.backgroundColor : '#fff',
      width: canvasStore.width + 'px',
      height: canvasStore.height + 'px'
    }"
    >
      <!-- 绘画层 -->
      <canvas
        class="canvas"
        :style="{zIndex: posterStore.activity === OPERATION.FORM.v || notSelected ? 999 : -2 }"
        :width="canvasStore.width"
        :height="canvasStore.height"
        id="canvas"
      ></canvas>
      <!-- 图层 -->
      <canvas 
        v-for="(canvas, index) in canvasStore.canvasList.toReversed()"
        :key="canvas.uid"
        :style="{ zIndex: canvas.selected ? 998 : canvasStore.canvasList.length - index}"
        :width="canvasStore.width"
        :height="canvasStore.height"
        class="canvas"
        :id="`canvas${canvas.uid}`"
      ></canvas>
    </div>
</template>
<script setup lang='ts'>
import { every } from 'lodash'
import { FORM, OPERATION } from '@/common/constants'

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import { usePosterStore } from '@/store/poster'
const posterStore = usePosterStore()

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

import useRectangle from '@/hooks/use-rectangle'
const { drawRectangle } = useRectangle()

import useLine from '@/hooks/use-line'
const { drawLine } = useLine()

import useCircle from '@/hooks/use-circle'
const { drawCircle } = useCircle()

const notSelected = computed(() => {
  return every(canvasStore.canvasList, item => !item.selected)
})

watch(
  () => [formStore.form, posterStore.activity],
  () => {
    if (posterStore.activity === OPERATION.FORM.v) {
      // 绘制矩形
      if (formStore.form === FORM.RECTANGLE.v) {
        drawRectangle()
      }
      // 绘制圆形
      if (formStore.form === FORM.CIRCLE.v) {
        drawCircle()
      }
    }

    // 绘制线条
    if (posterStore.activity === OPERATION.BRUSH.v) {
      drawLine()
    }
  }
)

</script>

<style lang="scss" scoped>
.workspace {
  position: relative;
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    
  }
}
</style>