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
  getParent: (node: IInnerTreeNode) => IInnerTreeNode | undefined
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

export type UseDrag = {
  dragStart: (e: DragEvent, node: IInnerTreeNode) => void
  dragOver: (e: DragEvent, node: IInnerTreeNode) => void // 当拖动的元素在拖动时触发(触发多次)
  dragleave: (e: DragEvent) => void // 当拖动的元素离开可放置容器时触发
  drop: (e: DragEvent, node: IInnerTreeNode) => void // 放置元素时触发
  dragend: (e: DragEvent) => void // 事件结束
}

export interface IDropType {
  dropPrev?: boolean
  dropNext?: boolean
  dropInner?: boolean
}

export interface IDragState {
  dropType?: keyof Required<IDropType>
  draggingNode?: HTMLElement | null
}

export type LazyLoadResult = { node: IInnerTreeNode; treeItems: ITreeNode[] }

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & UseCore &
  UseToogle &
  UseCheck &
  UseOperable &
  UseDrag
