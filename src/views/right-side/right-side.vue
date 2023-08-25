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
        <div class="canvas-wrap">
          <div class="operation">
            <el-tooltip
              effect="dark"
              content="解除锁定"
              placement="right"
            >
              <el-icon 
                :size="18"
                v-if="canvasSelected.lock"
                @click="unlockCanvas"
              ><Unlock /></el-icon>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="锁定图层"
              placement="right"
            >
              <el-icon 
                :size="18"
                v-if="!canvasSelected.lock"
                @click="lockCanvas"
              ><Lock /></el-icon>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="新建图层"
              placement="right"
            >
              <el-icon 
                :size="18"
                @click="addCanvas"
              ><DocumentAdd /></el-icon>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除图层"
              placement="right"
            >
              <el-icon 
                :size="18"
                @click="delCanvas"
              ><DeleteFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="canvas-list">
            <div 
              :class="['canvas-item', item.selected && 'selected']" 
              v-for="item in canvasStore.canvasList.toReversed()" 
              :key="item.uid"
              @click="selectCanvas(item)"
            >
              <div class="canvas-item_form">
                <div class="rectangle" v-if="item.rectangle"></div>
                <div class="circle" v-if="item.circle"></div>
                <div class="img" v-if="item.file">
                  <img :src="item.file.path" alt="">
                </div>
              </div>
              <div class="canvas-item_name">{{ item.name }}</div>
              <el-icon 
                :size="16"
                v-if="item.lock"
              ><Lock /></el-icon>
            </div>
            <div class="canvas-item">
              <div class="canvas-item_form"></div>
              <div class="canvas-item_name">背景</div>
              <el-icon 
                :size="16"
              ><Lock /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { DocumentAdd, DeleteFilled, Lock, Unlock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCanvasStore } from '@/store/canvas'
import { Canvas } from '@/interface/canvas'

const canvasStore = useCanvasStore()
const size = reactive({
  width: canvasStore.width,
  height: canvasStore.height
})
const canvasSizeChange = () => {
  canvasStore.changeSize(size)
}

const backgroundColor = ref(canvasStore.backgroundColor)
const changeBackgroundColor = () => {
  canvasStore.changeBgColor(backgroundColor.value)
}

let canvasSelected = ref<Canvas>({} as Canvas)
const selectCanvas = (canvas: Canvas) => {
  const selected = !canvas.selected
  canvasStore.changeSelected(canvas, selected)
  if (selected) {
    canvasSelected.value = canvas
  }
}

const addCanvas = () => {
  canvasStore.push({
    uid: Date.now()
  })
}

const delCanvas = () => {
  if (!canvasSelected.value.uid) {
    ElMessage({
      message: '未选中图层！',
      type: 'warning',
    })
    return
  }

  if (canvasSelected.value.lock) {
    ElMessage({
      message: '选中图层已锁定，不可删除！',
      type: 'warning',
    })
    return
  }

  const index = canvasStore.canvasList.findIndex(item => item.uid === canvasSelected.value.uid)
  if (index >= 0 ) {
    canvasStore.splice(index)
  }
}

const unlockCanvas = () => {
  const index = canvasStore.canvasList.findIndex(item => item.uid === canvasSelected.value.uid)
  canvasSelected.value.lock = false
  if (index >= 0) {
    canvasStore.splice(index, canvasSelected.value)
  }
}

const lockCanvas = () => {
  const index = canvasStore.canvasList.findIndex(item => item.uid === canvasSelected.value.uid)
  canvasSelected.value.lock = true
  if (index >= 0) {
    canvasStore.splice(index, canvasSelected.value)
  }
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

  .canvas-wrap {
    padding: 10px 10px 30px;
    background-color: #fafafa;
    position: relative;
    box-sizing: border-box;

    .canvas-list {
      max-height: 300px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: rgba(193, 203, 198, 0.3);
      }
      &::-webkit-scrollbar-thumb {
        background: #6abae8;
        cursor: pointer;
        border-radius: 3px;
        width: 2px;
      }
      &::-webkit-scrollbar-corner {
        display: none;
      }
      &::-webkit-resizer {
        display: none;
      }
    }
    .canvas-item {
      display: flex;
      padding: 10px;
      align-items: center;
      border: 1px solid #bbb;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 0;
      }

      &.selected {
        background-color: #b5cee3;
      }
      
      &_form {
        width: 40%;
        height: 30px;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 10px;
      }
      &_name {
        flex: 1;
        padding-left: 16px;
        font-size: 12px;
      }
      .rectangle {
        width: 60%;
        height: 20px;
        border: 1px solid #ddd;
      }

      .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ddd;
      }

      .img {
        img {
          height: 20px;
        }
      }
    }

    .operation {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30px;
      background-color: #fafafa;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 10px;
      :deep(.el-icon) {
        color: #333;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>