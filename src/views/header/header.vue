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
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </header>
</template>
  
<script setup lang='ts' name="editor-header">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadProps, UploadInstance } from 'element-plus';

const uploadRef = ref<UploadInstance>()
import useImage from '@/hooks/draw-image'
const { drawImage } = useImage()

import { useCanvasStore } from '@/store/canvas'
const canvasStore = useCanvasStore()

const guides = ref(false)

/**
 * @description 导入文件
 * @param uploadFile 上传的文件
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
  drawImage(uploadFile.raw as File)
}

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

/**
 * @description 保存画布内容为图片
 */
const save = () => {
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

const downloadImage = (imgData: string) => {
  const alink = document.createElement('a')
  const fileName = `${Date.now()}.png`
  const blob = base64Img2Blob(imgData)
  alink.download = fileName
  alink.href = URL.createObjectURL(blob)
  alink.click()
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