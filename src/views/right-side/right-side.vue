<template>
  <div class="right-side">
    <div class="common-operation">
      <div class="sizes-wrap">
        <el-divider content-position="left">尺寸</el-divider>
        <el-form label-width="20px">
          <el-form-item label="宽">
            <el-input />
          </el-form-item>
          <el-form-item label="高">
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      <div class="background-color_wrap">
        <el-divider content-position="left">颜色</el-divider>
        <div class="demo-color-block">
          <el-form label-width="50px">
            <el-form-item label="颜色">
              <el-color-picker v-model="color" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
  import { ref } from 'vue'

  const color = ref('')
</script>
  
<style lang="scss" scoped>
  .right-side {
    height: 100%;
    background: #fff;
    padding-top: 20px;
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
  }
</style>