<template>
  <SButton type="primary" disabled tertiary size="small" @click="aa"
    >primary</SButton
  >
  <SButton type="default" tertiary disabled size="small" @click="aa"
    >default</SButton
  >
</template>

<script setup lang="ts">
import { SButton } from './button/index'
const aa = () => {
  console.log('object')
}
</script>

<style lang="scss"></style>
