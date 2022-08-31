import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'

export type UseCore = {
  ExpandedTree: ComputedRef<IInnerTreeNode[]>
  getChildren: (
    nodes: IInnerTreeNode[],
    isRecursion?: boolean, // 是否获取直接子节点
    result?: IInnerTreeNode[]
  ) => IInnerTreeNode[]
  setAllParentLength: (node: IInnerTreeNode) => void
  getIndex: (node: IInnerTreeNode) => number
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

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & UseCore &
  UseToogle &
  UseCheck &
  UseOperable
