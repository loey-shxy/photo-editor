<template>
  <div class="main-container">
    <Workspace
    />
  </div>
</template>

<script setup lang='ts'>
import Workspace from './workspace/workspace.vue'
</script>

<style lang="scss" scoped>
.main-container {
  flex: 1;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>