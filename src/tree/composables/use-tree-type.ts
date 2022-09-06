import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../src/tree-types'

export type UseCore = {
  ExpandedTree: ComputedRef<IInnerTreeNode[]>
  getChildren: (
    nodes: IInnerTreeNode[],
    isRecursion?: boolean, // 是否获取直接子节点
    result?: IInnerTreeNode[]
  ) => IInnerTreeNode[]
  getIndex: (node: IInnerTreeNode) => number
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
}

export type UseToogle = {
  toggleNode: (node: IInnerTreeNode) => void
}

export type UseCheck = {
  toggleCheckNode: (node: IInnerTreeNode) => void
}

export type UseOperable = {
  appendNode: (parent: IInnerTreeNode) => void
  removeNode: (node: IInnerTreeNode) => void
}

export type UseLazyLoad = {
  lazyloadNodes: (node: IInnerTreeNode) => void
}

export type LazyLoadResult = { node: IInnerTreeNode; treeItems: ITreeNode[] }

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & UseCore &
  UseToogle &
  UseCheck &
  UseOperable
