import { ExtractPropTypes, PropType } from 'vue'

type IButtonType = 'primary' | 'info' | 'warning' | 'default'
type IButtonSize = 'tiny' | 'small' | 'medium' | 'large'

export const buttonProps = {
  type: {
    type: String as PropType<IButtonType>,
    default: 'default'
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: 'small'
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
