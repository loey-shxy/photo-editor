<template>
  <div class="right-side">
    <div class="common-operation">
      <div class="sizes-wrap">
        <el-divider content-position="left">尺寸</el-divider>
        <el-form label-width="20px">
          <el-form-item label="宽">
            <el-input v-model.number="size.width" @change="canvasSizeChange" />
          </el-form-item>
          <el-form-item label="高">
            <el-input v-model.number="size.height" @change="canvasSizeChange" />
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-divider content-position="left">背景颜色</el-divider>
        <div class="demo-color-block">
          <el-color-picker v-model="backgroundColor" @change="changeBackgroundColor" />
        </div>
      </div>
      <div>
        <el-divider content-position="left">图层</el-divider>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { useCanvasStore } from '@/store/canvas'

const canvasStore = useCanvasStore()
const size = reactive({
  width: canvasStore.canvasSize.width,
  height: canvasStore.canvasSize.height
})
const canvasSizeChange = () => {
  canvasStore.changeSize(size)
}



const backgroundColor = ref(canvasStore.backgroundColor)
const changeBackgroundColor = () => {
  canvasStore.changeBgColor(backgroundColor.value)
}
</script>
  
<style lang="scss" scoped>
  .right-side {
    height: 100%;
    background: #fff;
    padding-top: 20px;
    position: fixed;
    right: 0;
    z-index: 10;
    .common-operation {
      width: 250px;
      padding: 0 20px;
      box-sizing: border-box;
      .sizes-wrap {
        :deep(.el-form) {
          display: flex;
          gap: 20px;
        }
      }
    }
  }
</style>