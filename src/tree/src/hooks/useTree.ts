import { IInnerTreeNode } from '../tree-types'
import { computed } from 'vue'

export function useTree(treeData: IInnerTreeNode[]) {
  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.find(item => item.id === node.id)
    if (find) find.expanded = !find.expanded
  }
  const getExpandedTree = computed(() => {
    let excludeNodes: IInnerTreeNode[] = []
    let result: IInnerTreeNode[] = []
    let expandedNodes = treeData.filter(
      node => node.hasOwnProperty('expanded') && !node.expanded
    )
    if (expandedNodes.length > 0) {
      excludeNodes = getChildren(expandedNodes)
      result = treeData.filter(
        node => !excludeNodes.some(exclud => exclud.id === node.id)
      )
    }
    return excludeNodes.length > 0 ? result : treeData
  })
  const getChildren = (
    nodes: IInnerTreeNode[],
    result: IInnerTreeNode[] = []
  ) => {
    let children = treeData.filter(item =>
      nodes.some(node => node.id === item.parentId)
    )
    if (children.length > 0) {
      result.push(...children)
      getChildren(children, result)
    }
    return result
  }
  return {
    toggleNode,
    getExpandedTree
  }
}
