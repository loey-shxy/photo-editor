<template>
  <div class="left-side">
    <OperationList
      @open-brush-style="openBrushStyle"
    />
    <transition
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutLeft"
    >
      <BrushStyle 
        v-show="showBrushStyle"
        @close-brush-style="closeBrushStyle"
      />
    </transition>
  </div>
</template>
  
<script setup lang='ts'>
import OperationList from './components/operation-list.vue'
import BrushStyle from './components/brush-style.vue'

const showBrushStyle = ref(false)
const openBrushStyle = () => {
  showBrushStyle.value = true
}
const closeBrushStyle = () => {
  showBrushStyle.value = false
}

</script>
  
<style lang="scss" scoped>
  .left-side {
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 10;
  }
</style>