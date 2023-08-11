<template>
    <div 
      class="workspace"
      :style="{
        'width': poster.canvasSize.width + 'px',
        'height': poster.canvasSize.height + 'px',
        'background-color': poster.backgroundColor
      }"
    ></div>
</template>
<script setup lang='ts'>
import { usePosterStore } from '@/store/poster'

const poster = usePosterStore()

</script>
  
<style lang="scss" scoped>
</style>