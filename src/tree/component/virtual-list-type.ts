import { ExtractPropTypes, PropType } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'

export const virtualListProps = {
  data: {
    type: Array as PropType<IInnerTreeNode[]>,
    default: () => [],
    require: true
  },
  itemHeight: {
    type: Number,
    default: 34
  },
  elComponent: {
    type: String,
    default: 'div'
  }
}

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>
