import { defineComponent } from 'vue'
import { $ } from 'vue/macros'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { useTree } from './hooks/useTree'
export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots, emit }) {
    const { data: treeData } = $(props)
    const { toggleNode, getExpandedTree } = useTree(treeData)

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
        <div style={{ userSelect: 'none' }}>
          {getExpandedTree.value.map(node => (
            <div
              style={{
                paddingLeft: 16 * node.level + 'px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{ width: '25px', height: '25px' }}
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
