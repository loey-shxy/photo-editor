<template>
    <div 
    class="workspace"
    :style="{
      backgroundColor: canvasStore.backgroundColor,
      width: canvasStore.width + 'px',
      height: canvasStore.height + 'px'
    }"
    >
      <!-- 绘画层 -->
      <canvas
        class="canvas"
        style="z-index: 9999;"
        :width="canvasStore.width"
        :height="canvasStore.height"
        id="canvas"
        v-if="posterStore.activity === OPERATION.FORM.v && notSelected"
      ></canvas>
      <!-- 图层 -->
      <canvas 
        v-for="(canvas, index) in canvasStore.canvasList.toReversed()"
        :key="canvas.uid"
        :style="{ zIndex: canvas.selected ? 9000 : canvasStore.canvasList.length - index}"
        :width="canvasStore.width"
        :height="canvasStore.height"
        class="canvas"
        :id="`canvas${canvas.uid}`"
      ></canvas>
    </div>
</template>
<script setup lang='ts'>
import { FORM, OPERATION } from '@/common/constants'
import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import { usePosterStore } from '@/store/poster'
const posterStore = usePosterStore()

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

import useRectangle from '@/hooks/draw-rectangle'
const { drawForm } = useRectangle()

import useLine from '@/hooks/draw-line'
const { drawLine } = useLine()

import useCircle from '@/hooks/draw-circle'
import { every } from 'lodash';
import { Canvas } from '@/interface/canvas';
const { drawCircle } = useCircle()

const notSelected = computed(() => {
  return every(canvasStore.canvasList, item => !item.selected)
})

watch(
  () => [formStore.form, posterStore.activity],
  () => {
    // 绘制矩形
    if (posterStore.activity === OPERATION.FORM.v) {
      nextTick(() => {
        const canvas = document.querySelector('#canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = canvasStore.width
        canvas.height = canvasStore.height
  
        if (formStore.form === FORM.RECTANGLE.v) {
          drawForm(canvas, ctx)
        }
        if (formStore.form === FORM.CIRCLE.v) {
          drawCircle(canvas, ctx)
        }
      })
    }

    // 画笔
    if (posterStore.activity === OPERATION.BRUSH.v) {
      let uid = Date.now() 
      let selectedCanvas = canvasStore.canvasList[canvasStore.canvasList.length-1]
      if (!notSelected) {
        selectedCanvas = canvasStore.canvasList.find(item => item.selected) as Canvas
      }
      if (!canvasStore.canvasList.length || selectedCanvas.rectangle || selectedCanvas.text || notSelected) {
        uid = Date.now()
        canvasStore.push({
          uid,
        })
      }

      nextTick(() => {
        const cav = document.querySelector(`#canvas${uid}`) as HTMLCanvasElement
        const c = cav.getContext('2d') as CanvasRenderingContext2D
        drawLine(cav, c)
      })
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