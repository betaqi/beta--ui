import { ExtractPropTypes, PropType } from 'vue'
export interface ITreeNode {
  label: string
  id?: string
  children?: ITreeNode[]

  selected?: boolean
  checked?: boolean
  expanded?: boolean
  inChecked?: boolean

  disableSelect?: boolean
  disableCheck?: boolean
  disableToggle?: boolean
}
export interface IInnerTreeNode extends ITreeNode {
  parentId?: string
  level: number
  isLeaf?: boolean
}

export const treeProps = {
  data: {
    type: Object as PropType<IInnerTreeNode[]>,
    default: () => [],
    require: true
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>
