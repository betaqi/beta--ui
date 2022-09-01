import { Ref } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseToogle } from './use-tree-type'

export function useToogle(treeData: Ref<IInnerTreeNode[]>): UseToogle {
  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.value.find(
      item => item.hasOwnProperty('expanded') && item.id === node.id
    )
    if (find) find.expanded = !find.expanded
  }

  return {
    toggleNode
  }
}
