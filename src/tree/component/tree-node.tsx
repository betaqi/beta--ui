import { defineComponent, inject } from 'vue'
import { TreeNodeProps, treeNodeProps, TreeUtils } from './tree-node-types'
import { IInnerTreeNode } from '../src/tree-types'
import { $ } from 'vue/macros'
const NODE_HEIGHT = 30
const NODE_PADDING = 16
const ICON_WIDTH_OR_HEIGHT = 25

export default defineComponent({
  name: 'STreeNode',
  props: treeNodeProps,

  setup(props: TreeNodeProps, { slots, emit }) {
    const { node, checkable, draggable } = $(props)
    const { toggleNode, toggleCheckNode } = inject('TREE_UTILS') as TreeUtils

    const defaultswitcherIcon = (node: IInnerTreeNode) => {
      return (
        <svg
          style={{
            width: '18px',
            height: '18px',
            display: 'inline-block',
            transform: node.expanded ? 'rotate(90deg)' : ''
          }}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
        </svg>
      )
    }

    return () => {
      return (
        <div
          class="s-tree-item relative flex items-center"
          title={node.label}
          style={{
            paddingLeft: NODE_PADDING * node.level + 'px',
            height: NODE_HEIGHT + 'px'
          }}
        >
          {/* 参照线 */}
          {!node.isLeaf && node.expanded && node.childrenLength && (
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
          <span
            class="h-full flex items-center justify-center"
            style={{
              width: ICON_WIDTH_OR_HEIGHT + 'px'
            }}
            onClick={() => toggleNode(node)}
          >
            {slots.switcherIcon!()}
          </span>
          {/* 复选框 */}
          {checkable && (
            <div class="checkbox-box">
              <div
                class="checkbox-icon"
                style={{
                  backgroundColor: node.checked || node.half ? 'red' : ''
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
        </div>
      )
    }
  }
})
