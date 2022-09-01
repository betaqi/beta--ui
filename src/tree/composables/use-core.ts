import { Ref, computed } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseCore } from './use-tree-type'

export function useCore(treeData: Ref<IInnerTreeNode[]>): UseCore {
  const ExpandedTree = computed(() => {
    let result: IInnerTreeNode[] = []
    let excludeNodes: IInnerTreeNode[] = []

    treeData.value.forEach(node => {
      if (node.hasOwnProperty('expanded')) {
        // 为可折叠节点增加childrenLength属性
        node.childrenLength = getChildren([node]).length
      }
    })

    for (const item of treeData.value) {
      // 如果遍历的节点在排除列表中，跳过本次循环
      if (excludeNodes.map(node => node.id).includes(item.id)) continue
      // 当前节点收起，它的子节点应该被排除掉
      console.log(excludeNodes)
      if (!item.expanded) excludeNodes = getChildren([item])
      result.push(item)
    }

    let expandedNodes = result.filter(
      node => node.hasOwnProperty('expanded') && !node.expanded
    )
    for (const node of expandedNodes) {
      setAllParentLength(node)
    }
    return result
  })

  const getChildren = (
    nodes: IInnerTreeNode[],
    isRecursion: boolean = false, // 是否获取直接子节点
    result: IInnerTreeNode[] = []
  ) => {
    let children = treeData.value.filter(item =>
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
    let parentNode = treeData.value.find(item => node.parentId === item.id)
    if (parentNode?.childrenLength && node.childrenLength) {
      parentNode.childrenLength =
        parentNode.childrenLength - node.childrenLength
    }
    if (parentNode?.parentId) {
      setAllParentLength(parentNode)
    }
  }

  const getIndex = (node: IInnerTreeNode) => {
    return treeData.value.findIndex(item => item.id === node.id)
  }

  return { ExpandedTree, getChildren, getIndex }
}
