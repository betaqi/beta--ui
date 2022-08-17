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
    isRecursion: boolean = false, // 是否获取直接子节点
    result: IInnerTreeNode[] = []
  ) => {
    let children = treeData.filter(item =>
      nodes.some(node => node.id === item.parentId)
    )
    if (children.length > 0 && !isRecursion) {
      result.push(...children)
      getChildren(children, false, result)
    }
    return isRecursion ? children : result
  }

  // 修改折叠节点所有祖先节点的childrenLength
  const setAllParentLength = (node: IInnerTreeNode) => {
    let parentNode = treeData.find(item => node.parentId === item.id)
    if (parentNode?.childrenLength && node.childrenLength) {
      parentNode.childrenLength =
        parentNode.childrenLength - node.childrenLength
    }
    if (parentNode?.parentId) {
      setAllParentLength(parentNode)
    }
  }

  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked
    // 父->子联动
    getChildren([node]).forEach(child => (child.checked = node.checked))
    // 子->父联动
    const parentNode = treeData.find(n => n.id === node.parentId)
    if (!parentNode) return
    checkParentSelect(parentNode)
  }

  const checkParentSelect = (parentNode: IInnerTreeNode) => {
    const siblings = getChildren([parentNode], true)
    const checkedSiblings = siblings.filter(item => item.checked)
    if (checkedSiblings.length > 0) parentNode.half = true
    if (checkedSiblings.length === 0) parentNode.half = false
    if (checkedSiblings.length === siblings.length) {
      parentNode.half = false
      parentNode.checked = true
      const grandNode = treeData.find(n => n.id === parentNode.parentId)
      if (grandNode) checkParentSelect(grandNode)
    } else {
      parentNode.checked = false
      const grandNode = treeData.find(n => n.id === parentNode.parentId)
      if (grandNode) checkParentSelect(grandNode)
    }
  }

  return {
    toggleNode,
    getExpandedTree,
    getChildren,
    toggleCheckNode
  }
}
