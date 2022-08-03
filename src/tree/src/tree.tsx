import { defineComponent } from 'vue'
import { $ } from 'vue/macros'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { useTree } from './hooks/useTree'

const NODE_HEIGHT = 30
const NODE_PADDING = 16
const ICON_WIDTH_OR_HEIGHT = 25

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots, emit }) {
    const { data: treeData } = $(props)
    const { toggleNode, getExpandedTree, getChildren } = useTree(treeData)

    const defaultIcon = (node: IInnerTreeNode) => {
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
    const onMouseover = (e: MouseEvent) => {
      e.target instanceof HTMLDivElement &&
        (e.target.style.backgroundColor = '#eceded')
    }
    const onMouseout = (e: MouseEvent) => {
      e.target instanceof HTMLDivElement &&
        (e.target.style.backgroundColor = '')
    }

    return () => {
      return (
        <div
          style={{ userSelect: 'none' }}
          onMouseover={() => onMouseover(event)}
          onMouseout={() => onMouseout(event)}
        >
          {getExpandedTree.value.map(node => (
            <div
              class="relative flex items-center"
              style={{
                paddingLeft: NODE_PADDING * node.level + 'px',
                height: NODE_HEIGHT + 'px'
              }}
            >
              {/* 参照线 */}
              {!node.isLeaf && node.expanded && (
                <span
                  class="absolute w-px bg-gray-300"
                  style={{
                    height: NODE_HEIGHT * getChildren([node]).length + 'px',
                    left:
                      NODE_PADDING * node.level +
                      ICON_WIDTH_OR_HEIGHT / 2 +
                      'px',
                    top: NODE_HEIGHT + 'px'
                  }}
                ></span>
              )}
              {/* icon */}
              <div
                style={{
                  width: ICON_WIDTH_OR_HEIGHT + 'px',
                  height: ICON_WIDTH_OR_HEIGHT + 'px',
                  textAlign: 'center'
                }}
                onClick={() => toggleNode(node)}
              >
                {node.hasOwnProperty('expanded')
                  ? slots.icon
                    ? slots.icon(node.expanded)
                    : defaultIcon(node)
                  : ''}
              </div>
              <span class="s-tree-name">{node.label}</span>
            </div>
          ))}
        </div>
      )
    }
  }
})

function e(e: any): void {
  throw new Error('Function not implemented.')
}
