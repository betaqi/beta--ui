import { IInnerTreeNode, ITreeNode } from '../tree-types'
import { computed, reactive } from 'vue'
import { generateInnerTree } from '../utils'

export function useTree(tree: ITreeNode[]) {
  let treeData: IInnerTreeNode[] = reactive(generateInnerTree(tree))
  const toggleNode = (node: IInnerTreeNode) => {
    let find = treeData.find(
      item => item.hasOwnProperty('expanded') && item.id === node.id
    )
    getChildren([node])
      .filter(node => node.hasOwnProperty('expanded'))
      .forEach(r => (r.expanded = true))
    if (find) find.expanded = !find.expanded
  }

  const getExpandedTree = computed(() => {
    let excludeNodes: IInnerTreeNode[] = []
    let expandedNodes = treeData.filter(
      node => node.hasOwnProperty('expanded') && !node.expanded
    )
    treeData.forEach(node => {
      if (node.hasOwnProperty('expanded')) {
        // 为可折叠节点增加childrenLength属性
        node.childrenLength = getChildren([node]).length
      }
    })
    for (const node of expandedNodes) {
      setAllParentLength(node)
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

  // 修改折叠节点所有祖先节点的childrenLength
  const setAllParentLength = (node: IInnerTreeNode) => {
    let prentNode = treeData.find(item => node.parentId === item.id)
    if (prentNode?.childrenLength && node.childrenLength) {
      prentNode.childrenLength = prentNode.childrenLength - node.childrenLength
    }
    if (prentNode?.parentId) {
      setAllParentLength(prentNode)
    }
  }

  return {
    toggleNode,
    getExpandedTree
  }
}
