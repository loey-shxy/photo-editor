<template>
  <div class="left-side">
    <div class="icon-wrap">
      <img src="@/assets/images/rectangle.png" alt="">
      <img src="@/assets/images/cut.png" alt="">
      <img src="@/assets/images/text.png" alt="">
    </div>
  </div>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style lang="scss" scoped>
  .left-side {
    background: #fff;
    height: 100%;
    .icon-wrap {
      margin-top: 20px;
      height: 100%;
      width: 50px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      img { 
        width: 20px;
        cursor: pointer;
      }
    }
  }
</style>