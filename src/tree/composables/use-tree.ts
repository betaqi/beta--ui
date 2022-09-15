import { ref, SetupContext } from 'vue'
import type { ITreeNode } from '../src/tree-types'
import type { TreeUtils } from './use-tree-type'
import { generateInnerTree } from '../src/utils'
import { useCore } from './use-core'
import { useToogle } from './use-toogle'
import { useCheck } from './use-check'
import { useOperable } from './use-operable'
import { useLazyLoad } from './use-lazyLoad'
import { useDrag } from './use-drag'

export function useTree(tree: ITreeNode[], context: SetupContext): TreeUtils {
  let treeData = ref(generateInnerTree(tree))
  const core = useCore(treeData)
  const plugins = [useToogle, useCheck, useOperable, useDrag]
  const lazyLoad = useLazyLoad(treeData, core, context)
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core, lazyLoad) }
  }, {})

  return {
    ...core,
    ...pluginMethods,
    treeData
  } as TreeUtils
}
