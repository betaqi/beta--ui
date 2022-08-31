import { Ref, computed } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseCore } from './use-tree-type'

export function useCore(treeData: Ref<IInnerTreeNode[]>): UseCore {
  const ExpandedTree = computed(() => {
    let excludeNodes: IInnerTreeNode[] = []
    let expandedNodes = treeData.value.filter(
      node => node.hasOwnProperty('expanded') && !node.expanded
    )
    treeData.value.forEach(node => {
      if (node.hasOwnProperty('expanded')) {
        // 为可折叠节点增加childrenLength属性
        node.childrenLength = getChildren([node]).length
      }
    })
    for (const node of expandedNodes) {
      setAllParentLength(node)
    }
    excludeNodes = getChildren(expandedNodes)
    treeData.value.forEach(node => {
      if (excludeNodes.some(exclud => exclud.id === node.id))
        node.isShow = false
      else node.isShow = true
    })

    return treeData.value
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
