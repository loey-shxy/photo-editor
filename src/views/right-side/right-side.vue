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
      <div class="background-color_wrap">
        <el-divider content-position="left">颜色</el-divider>
        <div class="demo-color-block">
          <el-form label-width="80px">
            <el-form-item label="颜色">
              <el-color-picker v-model="brushColor" @change="canvasColorChange" />
            </el-form-item>
            <el-form-item label="背景颜色">
              <el-color-picker v-model="backgroundColor" @change="canvasBgColorChange" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { usePosterStore } from '@/store/poster'

const poster = usePosterStore()
const size = reactive({
  width: poster.canvasSize.width,
  height: poster.canvasSize.height
})

const brushColor = ref(poster.brushColor)
const backgroundColor = ref(poster.backgroundColor)

const canvasSizeChange = () => {
  poster.changeSize(size)
}

const canvasColorChange = () => {
  poster.changeColor(brushColor.value)
}

const canvasBgColorChange = () => {
  poster.changeBgColor(backgroundColor.value)
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