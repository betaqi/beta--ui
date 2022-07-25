import { defineComponent, withModifiers, ref } from 'vue'
import { $ref } from 'vue/macros'
import Test from './Test'

export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },

  emits: ['emit'],

  setup(props, { slots, emit }) {
    let count = ref(0)
    const inc = () => {
      count.value++
      emit('emit')
    }
    const list = ref<string[]>(['a', 'b', 'c'])
    return () => {
      // v-if
      const span = count.value % 2 === 0 ? 'a' : 'b'
      return (
        <div onclick={withModifiers(inc, ['self'])}>
          {count.value}
          <input type="text" v-focus v-model={count.value}></input>
          <div>{span}</div>
          {/* v-for  */}
          <ul>
            {list.value.map(str => (
              <li key={str}>{str}</li>
            ))}
          </ul>
          {/* 插槽 */}
          <Test
            v-slots={{
              title: () => <h3>h3</h3>
            }}
          ></Test>
        </div>
      )
    }
  }
})
