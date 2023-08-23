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
        :width="canvasStore.width"
        :height="canvasStore.height"
        id="canvas"
        v-if="posterStore.activity === OPERATION.FORM.v"
      ></canvas>
      <!-- 图层 -->
      <canvas 
        v-for="canvas in canvasStore.canvasList"
        :key="canvas.uid"
        :width="canvasStore.width"
        :height="canvasStore.height"
        class="canvas"
        :id="`canvas${canvas.uid}`"
      ></canvas>
    </div>
</template>
<script setup lang='ts'>
import { FORM, OPERATION } from '@/common/constants'

import useRectangle from '@/hooks/draw-rectangle'
const { drawForm } = useRectangle()

import useLine from '@/hooks/draw-line'
const { drawLine } = useLine()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import { usePosterStore } from '@/store/poster'
const posterStore = usePosterStore()

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

watch(
  () => [formStore.form, posterStore.activity],
  () => {
    // 绘制矩形
    if (posterStore.activity === OPERATION.FORM.v && formStore.form === FORM.RECTANGLE.v) {
      const canvas = document.querySelector('#canvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.width = canvasStore.width
      canvas.height = canvasStore.height

      drawForm(canvas, ctx)
    }

    // 画笔
    if (posterStore.activity === OPERATION.BRUSH.v) {
      const last = canvasStore.canvasList[canvasStore.canvasList.length-1]
      let id = last ? last.uid : Date.now()
      if (!canvasStore.canvasList.length || last.rectangle || last.text) {
        id = Date.now()
        canvasStore.canvasPush({
          uid: id,
        })
      }

      nextTick(() => {
        const cav = document.querySelector(`#canvas${id}`) as HTMLCanvasElement
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
    &:first-child {
      z-index: 999;
    }
  }
}
</style>