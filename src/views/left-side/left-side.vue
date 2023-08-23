<template>
  <div class="left-side">
    <Operation
      @open-panel="openPanel"
    />
    <transition
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutLeft"
    >

      <div 
        class="panel"
        v-show="showPanel"
      >
        <div 
          class="close cursor-pointer" 
          @click="closePanel"
        >
          <el-icon color="#999"><ArrowLeftBold /></el-icon>
        </div>
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div>
            <Brush 
              v-show="operation === OPERATION.BRUSH.v"
            />

            <Form 
              v-show="operation === OPERATION.FORM.v"
            />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
  
<script setup lang='ts'>
import { OPERATION } from '@/common/constants'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import Operation from './components/operation.vue'
import Brush from './components/brush.vue'
import Form from './components/form.vue'

import { usePosterStore } from '@/store/poster'
import { IActivity } from '@/interface/canvas'
const posterStore = usePosterStore()

const showPanel = ref(false)
const openPanel = () => {
  showPanel.value = true
}
const closePanel = () => {
  showPanel.value = false
}

const operation = ref<IActivity>(null)

watch(
  () => posterStore.activity,
  () => {
    operation.value = posterStore.activity
  }
)
</script>
  
<style lang="scss" scoped>
.left-side {
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 10;
}
.panel {
  width: $brushStylePanelWidth;
  height: 100%;
  left: $leftOperationWidth;
  position: absolute;
  background-color: #fff;
  top: 0;
  z-index: -1;
  border-right: 1px solid #ddd;
  padding: 20px;
  .close {
    position: absolute;
    top: 50%;
    right: -16px;
    width: 16px;
    background: #fff;
    height: 50px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height: 50px;
    text-align: center;
  }
}
</style>