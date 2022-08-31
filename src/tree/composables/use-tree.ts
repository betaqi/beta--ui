import type { ITreeNode } from '../src/tree-types'
import type { TreeUtils } from './use-tree-type'
import { generateInnerTree } from '../src/utils'
import { useCore } from './use-core'
import { useToogle } from './use-toogle'
import { useCheck } from './use-check'
import { useOperable } from './use-operable'
import { ref } from 'vue'

export function useTree(tree: ITreeNode[]): TreeUtils {
  let treeData = ref(generateInnerTree(tree))
  const core = useCore(treeData)
  const plugins = [useToogle, useCheck, useOperable]
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core) }
  }, {})

  return {
    ...core,
    ...pluginMethods,
    treeData
  } as TreeUtils
}
