<template>
  <div class="line">
    <div class="line-desc">
      <el-divider content-position="left">线条样式</el-divider>
      <div class="line-style">
        <div 
          :class="['line-style_item cursor-pointer', lineStore.lineStyle === item.v && 'selected']" 
          v-for="item in LINE_STYLES" 
          :key="item.v"
          @click="changeLineStyle(item.v)"
        >
          <div :class="['line-style_line', item.v]"></div>
        </div>
      </div>
    </div>
    <div class="line-desc">
      <el-divider content-position="left">笔尖形状</el-divider>
      <div class="line-cap_wrap">
        <div 
          :class="['line-cap_item cursor-pointer', lineStore.lineCap === item.v && 'selected']" 
          v-for="item in LINE_CAP" 
          :key="item.v"
          @click="changeLineCap(item.v)"
        >
          <div :class="['line-cap', item.v]"></div>
        </div>
      </div>
    </div>
    <div class="line-desc">
      <el-divider content-position="left">颜色</el-divider>
      <el-color-picker v-model="lineColor" @change="changeLineColor" />
    </div>
    <div class="line-desc">
      <el-divider content-position="left">大小</el-divider>
      <el-input 
        size="small"
        v-model="lineWidth"
        @change="changeWidth"
      >
        <template #suffix>px</template>
      </el-input>
      <el-slider 
        size="small" 
        v-model="lineWidth" 
        @change="changeWidth"
      />
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { useLineStore } from '@/store/line'
import { LINE_STYLES, LINE_CAP } from '@/common/constants'

const lineStore = useLineStore()

/**
 * @description 画笔样式
 */
const changeLineStyle = (style: string) => {
  lineStore.changeLineStyle(style)
}

/**
 * @description 画笔颜色
 */
const lineColor = ref(lineStore.lineColor)
const changeLineColor = () => {
  lineStore.changeColor(lineColor.value)
}

/**
 * @description 画笔大小
 */
const lineWidth = ref(lineStore.lineWidth)
const changeWidth = () => {
  lineStore.changeLineWidth(lineWidth.value)
}

/**
 * @description 笔尖形状
 */
const changeLineCap = (cap: string) => {
  lineStore.changeLineCap(cap)
}
</script>

<style lang="scss" scoped>
.line-style {
  &_item {
    box-sizing: border-box;
    border: 1px solid #ddd;
    &:not(:first-child) {
      margin-top: 20px;
    }
    &.selected {
      border-color: var(--el-color-primary);
    }
  }
  &_line {
    background-repeat: repeat;
    background-position: center;
    height: 20px;
    width: 90%;
    margin: 0 auto;
    &.solid {
      background-image: url('@/assets/images/solid.png');
    }
    &.dashed {
      background-image: url('@/assets/images/dashed.png');
    }
  }
}

.line-cap_wrap {
  display: flex;
  justify-content: space-between;
  .line-cap_item {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    &.selected {
      border-color: var(--el-color-primary);
    }
    .line-cap {
      width: 15px;
      height: 15px;
      background-color: #333;
      &.round {
        border-radius: 50%;
      }
    }
  }
}

.line-desc {
  &:not(:first-child) {
    margin-top: 20px;
  }
  :deep(.el-input) {
    margin-bottom: 16px;
  }
}
</style>