import { Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseToogle, UseCore, UseLazyLoad } from './use-tree-type'

export function useToogle(
  treeData: Ref<IInnerTreeNode[]>,
  core: UseCore,
  lazyLoad: UseLazyLoad
): UseToogle {
  const { lazyloadNodes } = lazyLoad

  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.value.find(
      item => item.hasOwnProperty('expanded') && item.id === node.id
    )

    if (find) {
      find.expanded = !find.expanded
      if (find.expanded && node.isLazy) lazyloadNodes(find)
    }
  }

  return {
    toggleNode
  }
}
