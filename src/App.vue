<template>
  <SButton type="primary" tertiary size="small">primary</SButton>
  <SButton type="default" size="small">default</SButton>
  <STree :data="tree" checkable operable @lazy-load="lazyLoad">
    <template #switcherIcon="expanded">{{ expanded ? '🙉' : '🙈' }}</template>
    <!-- <template #icon="node"
      ><img v-if="node.isLeaf" src="./assets/file-paste.svg" alt="" />
      <img v-else src="./assets/file.svg" alt="" />
    </template> -->
    <template #loading>
      <img src="../public/loading.svg" />
    </template>
  </STree>
</template>

<script setup lang="ts">
import { STree } from './tree/index'
import { SButton } from './button/index'
const tree = [
  {
    label: 'docs',
    id: 'docs'
  },
  {
    label: 'packages',
    id: 'packages',
    isLazy: true,
    children: []
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
            id: 'release2.1.ts',
            children: [
              {
                label: 'release2.1.0.ts',
                id: 'release2.1.0.ts'
              },
              {
                label: 'verifyCommit2.1.0.ts',
                id: 'verifyCommit2.1.0.ts'
              }
            ]
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

const data = [
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
        id: 'src',
        children: [
          {
            label: 'src1',
            id: 'src1'
          },
          {
            label: 'README1.md',
            id: 'README.md1'
          }
        ]
      },
      {
        label: 'README.md',
        id: 'README.md'
      }
    ]
  }
]
const lazyLoad = (node: any, cb: any) => {
  setTimeout(() => {
    cb({ node, treeItems: data })
  }, 2000)
}
</script>

<style lang="scss"></style>
