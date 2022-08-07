import { IInnerTreeNode } from '../tree-types'
import { computed } from 'vue'

export function useTree(treeData: IInnerTreeNode[]) {
  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.find(
      item => item.hasOwnProperty('expanded') && item.id === node.id
    )
    if (find) find.expanded = !find.expanded
  }
  const getExpandedTree = computed(() => {
    let excludeNodes: IInnerTreeNode[] = []
    let expandedNodes = treeData.filter(
      node => node.hasOwnProperty('expanded') && !node.expanded
    )
    treeData.forEach(node => {
      if (node.hasOwnProperty('expanded')) {
        node.childrenLength = getChildren([node]).length
      }
    })

    for (const node of expandedNodes) {
      getParent(node)
    }
    excludeNodes = getChildren(expandedNodes)
    treeData.forEach(node => {
      if (excludeNodes.some(exclud => exclud.id === node.id))
        node.isShow = false
      else node.isShow = true
    })

    return treeData
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
  const getParent = (node: IInnerTreeNode) => {
    let prentNode = treeData.find(item => node.parentId === item.id)
    if (prentNode?.childrenLength && node.childrenLength) {
      prentNode.childrenLength = prentNode.childrenLength - node.childrenLength
    }
    if (prentNode?.parentId) {
      getParent(prentNode)
    }
  }
  return {
    toggleNode,
    getExpandedTree,
    getChildren
  }
}
