<template>
  <div class="visible" @scroll="onScoroll">
    <div
      class="blank"
      :style="{ height: `${totalCount * itmeHeight}px` }"
    ></div>
    <div
      class="list"
      :style="{
        transform: `translate3d(0, ${offsetY}px, 0)`
      }"
    >
      <div class="item" v-for="(item, idx) in visibleData" :key="idx">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可视区域高度 visibleHeight
// 列表项高度 itmeHeight
// 显示条数 visibleConunt
// 滚动条位置 scrollTop

import { computed, ref } from 'vue'

const visibleHeight = 300
const itmeHeight = 24
const visibleConunt = Math.ceil(visibleHeight / itmeHeight)

const totalCount = 1000 // 列表总数
const data = ref(Array.from({ length: totalCount }).map((r, index) => index))

// 起始索引
const startIndex = ref(0)
const visibleData = computed(() => {
  return data.value.slice(startIndex.value, startIndex.value + visibleConunt)
})

const offsetY = ref(0)
const onScoroll = (e: UIEvent) => {
  const { scrollTop } = e.target as HTMLElement
  offsetY.value = scrollTop
  startIndex.value = Math.floor(scrollTop / itmeHeight)
}
</script>

<style lang="scss">
.item {
  height: 24px;
}
.visible {
  height: 300px;
  overflow: auto;
  position: relative;
  .blank {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10000px; // 列表项实际总高度：itemHeight * itemCount
  }
}
</style>
