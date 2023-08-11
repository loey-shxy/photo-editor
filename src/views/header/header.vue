<template>
    <header class="editor-header">
      <div class="left">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <el-divider direction="vertical" />
        <el-button type="text">
          导入文件
        </el-button>
        <el-divider direction="vertical" />
        <el-tooltip
          effect="dark"
          content="参考线"
          placement="bottom"
        >
          <el-switch v-model="guides" />
        </el-tooltip>
        <el-divider direction="vertical" />
        <div class="revocation">
          <img src="@/assets/images/revoke.png" alt="">
          <img src="@/assets/images/revoke.png" alt="">
        </div>
      </div>
      <div class="right">
        <el-button>清空</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </header>
</template>
  
<script setup lang='ts' name="editor-header">
import { ref } from 'vue'

const guides = ref(false)
</script>
  
<style lang="scss" scoped>
  .editor-header {
    height: $headerHeight;
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    z-index: 10;
    .left,
    .right {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
    }
    .left {
      display: flex;
      gap: 16px;
      .logo {
        img {
          height: 30px;
          border-radius: 50%;
        }
      }
      .revocation {
        img {
          height: 25px;
          cursor: pointer;
        }
        img:last-child {
          transform: rotateY(180deg);
        }
      }
    }
    .right {
      justify-content: flex-end;
    }
  }
</style>