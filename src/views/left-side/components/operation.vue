<template>
  <div class="icon-wrap">
    <div 
      v-for="item in OPERATION"
      :class="['icon-item cursor-pointer', active === item.v && 'active']" 
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
import { usePosterStore } from '@/store/poster'
const posterStore = usePosterStore()
const active = ref(posterStore.activity)
const emits = defineEmits(['open-panel'])
const changeOperation = (type: string) => {
  active.value = type
  posterStore.changeActivity(active.value)
  emits('open-panel')
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
    .icon {
      width: 20px;
      height: 20px;
      background-size: cover;
      margin: 0 auto;
    }
    .icon-form {
      background-image: url('@/assets/images/form.png');
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
      .icon-form {
        background-image: url('@/assets/images/form-white.png');
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