<template>
    <header class="editor-header">
      <div class="left">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <el-divider direction="vertical" />
        <el-upload
          ref="uploadRef"
          action=""
          multiple
          :show-file-list="false"
          :auto-upload="false"
          :on-change="uploadChange"
          accept="image/*"
        >
          <el-button type="primary">导入文件</el-button>
        </el-upload>
        <el-divider direction="vertical" />
        <el-tooltip
          effect="dark"
          content="参考线"
          placement="bottom"
        >
          <el-switch v-model="guides" />
        </el-tooltip>
        <el-divider direction="vertical" />
        <div class="revocation">
          <img src="@/assets/images/revoke.png" alt="">
          <img src="@/assets/images/revoke.png" alt="">
        </div>
      </div>
      <div class="right">
        <el-button @click="clear">清空</el-button>
        <el-button type="primary" @click="saveFile">保存</el-button>
      </div>
    </header>
</template>
  
<script setup lang='ts' name="editor-header">
import { ref } from 'vue'

import useImage from '@/hooks/use-image'
const { uploadChange, uploadRef } = useImage()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

import useDownload from '@/hooks/use-download'
const { saveFile } = useDownload()

const guides = ref(false)
/**
 * @description 清空画布
 */
const clear = () => {
  const canvasList = document.querySelectorAll('.canvas')
  canvasList.forEach(canvas => {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')  as CanvasRenderingContext2D
    ctx.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height)
  })
  canvasStore.clearCanvas()
}

</script>
  
<style lang="scss" scoped>
  .editor-header {
    height: $headerHeight;
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    z-index: 10;
    .left,
    .right {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
    }
    .left {
      display: flex;
      gap: 16px;
      .logo {
        img {
          height: 30px;
          border-radius: 50%;
        }
      }
      .revocation {
        img {
          height: 25px;
          cursor: pointer;
        }
        img:last-child {
          transform: rotateY(180deg);
        }
      }
    }
    .right {
      justify-content: flex-end;
    }
  }
</style>