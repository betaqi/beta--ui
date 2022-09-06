import { ref, Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { generateInnerTree } from '../src/utils'
import { LazyLoadResult, UseCore, UseLazyLoad } from './use-tree-type'

export function useLazyLoad(
  treeData: Ref<IInnerTreeNode[]>,
  { getNode, getIndex, getChildren }: UseCore,
  { emit }: SetupContext
): UseLazyLoad {
  const lazyloadNodes = (node: IInnerTreeNode) => {
    const innerNode = getNode(node)
    if (innerNode && !innerNode.isLeaf && !innerNode.childrenNodeCount) {
      innerNode.loading = true
      emit('lazy-load', node, dealChildNodes)
    }
  }

  const dealChildNodes = (result: LazyLoadResult) => {
    const node = getNode(result.node)
    if (node) {
      node.loading = false
      const childNodes = ref<IInnerTreeNode[]>(
        generateInnerTree(result.treeItems, node.level)
      )
      debugger
      setPrent(node, childNodes)
      insertChildNodes(node, childNodes)
      const childLength = getChildren([node]).length
      node.childrenNodeCount = childLength
    }
  }

  // 插入节点
  const insertChildNodes = (
    node: IInnerTreeNode,
    childNodes: Ref<IInnerTreeNode[]>
  ) => {
    const index = getIndex(node)
    index !== -1 && treeData.value.splice(index + 1, 0, ...childNodes.value)
  }

  return {
    lazyloadNodes
  }
}

// 设置父级
const setPrent = (node: IInnerTreeNode, childNodes: Ref<IInnerTreeNode[]>) => {
  childNodes.value.forEach(item => {
    if (item.level - 1 === node.level && !item.parentId) {
      item.parentId = node.id
    }
  })
}
