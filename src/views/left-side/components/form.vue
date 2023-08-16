<template>
  <div class="form">
    <el-divider content-position="left">形状</el-divider>
    <div class="form-list flex">
      <div 
        :class="[
          'flex align-items_center justify-content_center form-list_item cursor-pointer', 
          formStore.form === item.v && 'selected'
        ]"
        v-for="item in FORM"
        :key="item.v"
        @click="changeForm(item.v)"
      >
        <img :src="getImg(item.v)" alt="">
      </div>
    </div>

    
    <el-divider content-position="left" class="mt-30">边框样式</el-divider>
    <div class="line-style">
      <div 
        :class="['line-style_item cursor-pointer', formStore.borderStyle === item.v && 'selected']" 
        v-for="item in LINE_STYLES" 
        :key="item.v"
        @click="changeBorderStyle(item.v)"
      >
        <div :class="['line-style_line', item.v]"></div>
      </div>
    </div>

    <el-divider content-position="left" class="mt-30">边框大小</el-divider>
    <div>
      <el-input 
        size="small"
        v-model="borderWidth"
        @change="changeBorderWidth"
      >
        <template #suffix>px</template>
      </el-input>
      <el-slider 
        size="small" 
        v-model="borderWidth" 
        @change="changeBorderWidth"
      />
    </div>
    <el-divider content-position="left" class="mt-30">边框颜色</el-divider>
    <el-color-picker v-model="borderColor" @change="changeBorderColor" />
    
    <el-divider content-position="left" class="mt-30">填充颜色</el-divider>
    <el-color-picker v-model="fillColor" @change="changeFillColor" />
  </div>
</template>
  
<script setup lang='ts'>
import { FORM, LINE_STYLES } from '@/common/constants'

import { useFormStore } from '@/store/form'
const formStore = useFormStore()

const getImg = (name: string) => {
  switch(name) {
    case FORM.CIRCLE.v: return new URL('@/assets/images/circle.png', import.meta.url).href;
    case FORM.RECTANGLE.v: return new URL('@/assets/images/rectangle.png', import.meta.url).href;
    case FORM.ELLIPSE.v: return new URL('@/assets/images/ellipse.png', import.meta.url).href;
    case FORM.POLYGON.v: return new URL('@/assets/images/polygon.png', import.meta.url).href;
    case FORM.STRAIGHT.v: return new URL('@/assets/images/straight.png', import.meta.url).href;
  }
}

const changeForm = (form: string) => {
  formStore.changeForm(form)
}

const changeBorderStyle = (style: string) => {
  formStore.changeBorderStyle(style)
}

const borderWidth = ref(formStore.borderWidth)
const changeBorderWidth = () => {
  formStore.changeBorderWidth(borderWidth.value)
}

const borderColor = ref(formStore.borderColor)
const changeBorderColor = () => {
  formStore.changeBorderColor(borderColor.value)
}

const fillColor = ref(formStore.fillColor)
const changeFillColor = () => {
  formStore.changeFillColor(fillColor.value)
}
</script>
  
<style lang="scss" scoped>
.form {
  :deep(.el-divider) {
    margin-top: 20px;
  }
  .form-list {
    gap: 16px;
    flex-wrap: wrap;
    &_item {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      &.selected {
        border-color: var(--el-color-primary);
      }

      img {
        width: 30px;
      }
    }
  }

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
}
</style>