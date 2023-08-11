<template>
  <div class="icon-wrap">
    <div 
      v-for="item in OPERATION"
      :class="['icon-item', active === item.v && 'active']" 
      @click="changeOperation(item.v)"
    >
      <el-tooltip
        effect="dark"
        :content="item.l"
        placement="right"
      >
        <div 
          :class="['icon', `icon-${item.v}`]"
        ></div>
      </el-tooltip>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { OPERATION } from '@/common/constants'
const active = ref('')
const emits = defineEmits(['open-brush-style'])
const changeOperation = (type: string) => {
  active.value = type
  switch (type) {
    case OPERATION.BRUSH.v:
      emits('open-brush-style')
      break;
  
    default:
      break;
  }
}
</script>
  
<style lang="scss" scoped>
.icon-wrap {
  height: 100%;
  width: $leftOperationWidth;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 6;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ddd;
  img { 
    width: 20px;
  }
  .icon-item {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
      background-size: cover;
      margin: 0 auto;
    }
    .icon-rectangle {
      background-image: url('@/assets/images/rectangle.png');
    }
    .icon-cut {
      background-image: url('@/assets/images/cut.png');
    }
    .icon-text {
      background-image: url('@/assets/images/text.png');
    }
    .icon-brush {
      background-image: url('@/assets/images/brush.png');
    }
    &.active,
    &:hover {
      background: var(--el-color-primary);
      .icon-rectangle {
        background-image: url('@/assets/images/rectangle-white.png');
      }
      .icon-cut {
        background-image: url('@/assets/images/cut-white.png');
      }
      .icon-text {
        background-image: url('@/assets/images/text-white.png');
      }
      .icon-brush {
        background-image: url('@/assets/images/brush-white.png');
      }
    }
  }
}
</style>