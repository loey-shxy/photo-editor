<template>
  <div class="brush-style_wrap">
    <div 
      class="close" 
      @click="close"
    >
      <el-icon color="#999"><ArrowLeftBold /></el-icon>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ArrowLeftBold } from '@element-plus/icons-vue'
const emits = defineEmits(['close-brush-style'])

const close = () => {
  emits('close-brush-style')
}
</script>

<style lang="scss" scoped>
.brush-style_wrap {
  width: $brushStylePanelWidth;
  height: 100%;
  left: $leftOperationWidth;
  position: absolute;
  background-color: #fff;
  top: 0;
  z-index: 5;
  border-right: 1px solid #ddd;
  .close {
    position: absolute;
    top: 50%;
    right: -16px;
    width: 16px;
    background: #fff;
    height: 50px;
    cursor: pointer;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height: 50px;
    text-align: center;
  }
}
</style>