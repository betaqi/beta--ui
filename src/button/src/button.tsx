import { defineComponent } from 'vue'
import { ButtonProps, buttonProps } from './button-types'
import { $ref, $ } from 'vue/macros'

export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots, emit }) {
    const { type, size, disabled } = $(props)
    return () => {
      const defaultSlots = slots.default ? slots.default() : '按钮'
      return (
        <button class={`s-btn s-btn-${type} s-btn-${size}`} disabled={disabled}>
          {defaultSlots}
        </button>
      )
    }
  }
})
