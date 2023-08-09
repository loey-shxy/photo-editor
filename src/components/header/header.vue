<template>
    <header class="editor-header">
      <div class="left">
        <div class="logo">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
        </div>
        <div class="import-file">
          <el-button type="text">
            导入文件
          </el-button>
        </div>
        <div class="revocation">
        </div>
      </div>
      <div class="right">
        <el-button>清空</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </header>
</template>
  
<script setup lang='ts' name="editor-header">
</script>
  
<style lang="scss" scoped>
  .editor-header {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 5px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .left,
    .right {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
    }
    .left {
      display: flex;
      .logo {
        img {
          height: 40px;
          border-radius: 50%;
        }
        margin-right: 20px;
      }
    }
    .right {
      justify-content: flex-end;
    }
  }
</style>