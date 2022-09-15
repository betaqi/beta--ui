import { defineComponent, inject, ref } from 'vue'
import { TreeNodeProps, treeNodeProps } from './tree-node-types'
import { $ } from 'vue/macros'
import type { TreeUtils } from '../composables/use-tree-type'
import type { IInnerTreeNode } from '../src/tree-types'
const NODE_HEIGHT = 34
const NODE_PADDING = 16
const ICON_WIDTH_OR_HEIGHT = 25

export default defineComponent({
  name: 'STreeNode',
  props: treeNodeProps,

  setup(props: TreeNodeProps, { slots, emit }) {
    const { node, checkable, operable, drag } = $(props)

    const {
      toggleNode,
      toggleCheckNode,
      appendNode,
      removeNode,
      dragStart,
      dragOver,
      dragleave,
      drop,
      dragend
    } = inject('TREE_UTILS') as TreeUtils

    let dragProps = {}
    if (drag) {
      dragProps = {
        draggable: true,
        onDragstart: (e: DragEvent) => dragStart(e, node),
        onDragover: (e: DragEvent) => dragOver(e, node),
        onDragleave: (e: DragEvent) => dragleave(e),
        onDrop: (e: DragEvent) => drop(e, node),
        onDragend: (e: DragEvent) => dragend(e)
      }
    }

    const isShowOperable = ref(false)

    const isShowLine = (node: IInnerTreeNode) => {
      if (
        !node.isLeaf &&
        node.expanded &&
        node.childrenLength &&
        node.childrenLength > 0
      )
        return true
      return false
    }

    return () => {
      return (
        <div
          class="s-tree-item relative hover:bg-gray-200"
          onMousemove={e => {
            isShowOperable.value = true
          }}
          onMouseleave={e => {
            isShowOperable.value = false
          }}
          style={{
            paddingLeft: NODE_PADDING * node.level + 'px',
            height: NODE_HEIGHT + 'px'
          }}
        >
          {/* 参照线 */}
          {isShowLine(node) && node.childrenLength && (
            <span
              class="absolute w-px bg-gray-300"
              style={{
                height: NODE_HEIGHT * node.childrenLength + 'px',
                left:
                  NODE_PADDING * node.level + ICON_WIDTH_OR_HEIGHT / 2 + 'px',
                top: NODE_HEIGHT + 'px'
              }}
            ></span>
          )}
          {/* switcherIcon */}
          <div
            {...dragProps}
            id={node.id}
            class="node-content w-full h-full flex items-center"
            style={{
              marginLeft: !node.hasOwnProperty('expanded')
                ? ICON_WIDTH_OR_HEIGHT + 'px'
                : ''
            }}
          >
            {!node.loading
              ? node.hasOwnProperty('expanded') && (
                  <span
                    class="h-full flex items-center justify-center"
                    style={{
                      width: ICON_WIDTH_OR_HEIGHT + 'px'
                    }}
                    onClick={() => toggleNode(node)}
                  >
                    {slots.switcherIcon!()}
                  </span>
                )
              : slots.loading!()}
            {/* 复选框 */}
            {checkable && (
              <div class="checkbox-box">
                <div
                  class="checkbox-icon"
                  style={{
                    backgroundColor: node.checked || node.half ? '#0984e3' : ''
                  }}
                  onClick={() => toggleCheckNode(node)}
                >
                  {node.checked ? '√' : node.half ? '-' : ''}
                </div>
              </div>
            )}
            {/* icon */}
            {slots.icon!()}
            {node.label}
            {operable && isShowOperable.value && (
              <div class="inline-flex ml-1">
                <span class="w-4 text-center" onclick={() => appendNode(node)}>
                  +
                </span>
                <span class="w-4 text-center" onclick={() => removeNode(node)}>
                  -
                </span>
              </div>
            )}
          </div>
        </div>
      )
    }
  }
})
