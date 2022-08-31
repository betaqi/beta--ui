import { Ref } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseCore, UseToogle } from './use-tree-type'

export function useToogle(
  treeData: Ref<IInnerTreeNode[]>,
  { getChildren }: UseCore
): UseToogle {
  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.value.find(
      item => item.hasOwnProperty('expanded') && item.id === node.id
    )
    getChildren([node])
      .filter(node => node.hasOwnProperty('expanded'))
      .forEach(r => (r.expanded = true))
    if (find) find.expanded = !find.expanded
  }

  return {
    toggleNode
  }
}
