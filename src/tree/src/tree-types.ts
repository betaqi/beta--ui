import { ExtractPropTypes, PropType } from 'vue'
export interface ITreeNode {
  label: string
  id?: string
  children?: ITreeNode[]

  selected?: boolean
  checked?: boolean
  expanded?: boolean
  inChecked?: boolean
  childrenLength?: number
  half?: boolean
  isLazy?: boolean

  disableSelect?: boolean
  disableCheck?: boolean
  disableToggle?: boolean
}
export interface IInnerTreeNode extends ITreeNode {
  parentId?: string
  level: number
  isLeaf?: boolean
  loading?: boolean
  childrenNodeCount?: number
}

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
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
  draggable: {
    type: Boolean,
    default: false
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>
