import { defineComponent } from 'vue'
import { $ } from 'vue/macros'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { useTree, mouseTree, dropTree } from './hooks/index'

const NODE_HEIGHT = 30
const NODE_PADDING = 16
const ICON_WIDTH_OR_HEIGHT = 25

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots, emit }) {
    const { data: treeData, draggable, checkable } = $(props)
    const { toggleNode, getExpandedTree, getChildren, toggleCheckNode } =
      useTree(treeData)
    const { onMouseover, onMouseout } = mouseTree()
    const { dragstart, dragenter, dragleave, dragover, drop, dragend } =
      dropTree(getChildren)
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

    return () => {
      return (
        <div
          style={{ userSelect: 'none' }}
          onMouseover={e => onMouseover(e)}
          onMouseout={e => onMouseout(e)}
          onDragover={e => dragover(e)}
          onDragend={e => dragend(e)}
          onDragleave={e => dragleave(e)}
          onDragenter={e => dragenter(e)}
        >
          {getExpandedTree.value.map(
            node =>
              node.isShow && (
                <div
                  class="s-tree-item relative flex items-center"
                  draggable={draggable}
                  onDragstart={e => dragstart(e, node)}
                  onDrop={e => drop(e, node)}
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
                          NODE_PADDING * node.level +
                          ICON_WIDTH_OR_HEIGHT / 2 +
                          'px',
                        top: NODE_HEIGHT + 'px'
                      }}
                    ></span>
                  )}
                  {/* icon */}
                  <span
                    class="h-full flex items-center justify-center"
                    style={{
                      width: ICON_WIDTH_OR_HEIGHT + 'px'
                    }}
                    onClick={() => toggleNode(node)}
                  >
                    {node.hasOwnProperty('expanded')
                      ? slots.icon
                        ? slots.icon(node.expanded)
                        : defaultIcon(node)
                      : ''}
                  </span>
                  {/* 复选框 */}
                  {checkable && (
                    <div class="checkbox-box">
                      <div
                        class="checkbox-icon"
                        style={{
                          backgroundColor:
                            node.checked || node.half ? 'red' : ''
                        }}
                        onClick={() => toggleCheckNode(node)}
                      >
                        {node.checked ? '√' : node.half ? '-' : ''}
                      </div>
                    </div>
                  )}
                  {node.label}
                </div>
              )
          )}
        </div>
      )
    }
  }
})
