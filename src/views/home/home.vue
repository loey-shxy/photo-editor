<template>
  <div class="h5-editor">
    <Header />
    <div class="layout-main">
      <LeftSide />
      <MainComponent
      />
      <RightSide
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '../header/header.vue'
import LeftSide from '../left-side/left-side.vue'
import MainComponent from '../main/index.vue'
import RightSide from '../right-side/right-side.vue'

</script>
<style lang="scss" scoped>
  .h5-editor {
    background: #dadada;
    width: 100%;
    height: 100%;
  }
  .layout-main {
    display: flex;
    height: calc(100% - 50px);
  }
</style>