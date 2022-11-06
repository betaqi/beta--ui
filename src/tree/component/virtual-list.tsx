import { defineComponent, toRefs, computed, ref, onMounted } from 'vue'
import { VirtualListProps, virtualListProps } from './virtual-list-type'

export default defineComponent({
  name: 'virtualLlist',
  props: virtualListProps,
  setup(props: VirtualListProps, { slots, emit }) {
    const { data, itemHeight, elComponent } = toRefs(props)
    const visibleRef = ref()
    const visibleHeight = ref(0)
    const blankHeight = computed(
      () => data.value.length * itemHeight.value + 'px'
    )

    const visibleConunt = computed(() =>
      Math.ceil(visibleHeight.value / itemHeight.value)
    )

    // 起始索引
    const startIndex = ref(0)
    const visibleData = computed(() => {
      return data.value.slice(
        startIndex.value,
        startIndex.value + visibleConunt.value
      )
    })

    const offsetY = ref(0)
    const onScroll = (e: UIEvent) => {
      const { scrollTop } = e.target as HTMLElement
      console.log(offsetY.value)
      offsetY.value = scrollTop

      startIndex.value = Math.floor(scrollTop / itemHeight.value)
    }

    onMounted(() => {
      visibleHeight.value = visibleRef.value?.clientHeight
    })

    return () => {
      return (
        <elComponent.value
          class="virtual-list-visible"
          ref={visibleRef}
          onscroll={onScroll}
        >
          <div
            class="virtual-list-blank"
            style={{ height: blankHeight.value }}
          ></div>
          <div
            style={{
              transform: `translate3d(0, ${offsetY.value}px, 0)`
            }}
          >
            {visibleData.value.map(item => slots.default!(item))}
          </div>
        </elComponent.value>
      )
    }
  }
})
