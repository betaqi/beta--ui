import { ExtractPropTypes, PropType } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'

export const treeNodeProps = {
  node: {
    type: Object as PropType<IInnerTreeNode>,
    default: () => [],
    require: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  operable: {
    type: Boolean,
    default: false
  },
  drag: {
    type: Boolean,
    default: false
  }
} as const

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
