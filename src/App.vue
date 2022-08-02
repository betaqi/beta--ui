<template>
  <SButton type="primary" tertiary size="small">primary</SButton>
  <SButton type="default" size="small">default</SButton>
  <STree :data="data">
    <template #icon="iconProps">{{ iconProps ? '🙉' : '🙈' }}</template>
  </STree>
</template>

<script setup lang="ts">
import { STree } from './tree/index'
import { SButton } from './button/index'
import { generateInnerTree } from './tree/src/utils'
import { reactive } from 'vue'
const tree = [
  {
    label: 'docs',
    id: 'docs'
  },
  {
    label: 'packages',
    id: 'packages',
    children: [
      {
        label: 'plugin-vue',
        id: 'plugin-vue'
      },
      {
        label: 'vite',
        id: 'vite',
        children: [
          {
            label: 'src',
            id: 'src'
          },
          {
            label: 'README.md',
            id: 'README.md'
          }
        ]
      }
    ]
  },
  {
    label: 'scripts',
    id: 'scripts',
    children: [
      {
        label: 'release.ts',
        id: 'release.ts',
        children: [
          {
            label: 'release2.ts',
            id: 'release2.ts'
          },
          {
            label: 'verifyCommit2.ts',
            id: 'verifyCommit2.ts'
          }
        ]
      },
      {
        label: 'verifyCommit.ts',
        id: 'verifyCommit.ts',
        children: [
          {
            label: 'release2.1.ts',
            id: 'release2.1.ts'
          },
          {
            label: 'verifyCommit2.1.ts',
            id: 'verifyCommit2.1.ts'
          }
        ]
      }
    ]
  },
  {
    label: 'pnpm-workspace.yaml',
    id: 'pnpm-workspace.yaml'
  }
]
const data = reactive(generateInnerTree(tree))
</script>

<style lang="scss"></style>
