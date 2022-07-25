import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots, emit }) {
    return () => {
      return (
        <>
          <div>hello Test</div>
          <div> {slots.title ? slots.title() : 'title slot content'}</div>
        </>
      )
    }
  }
})
