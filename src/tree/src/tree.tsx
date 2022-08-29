import { defineComponent, provide } from 'vue'
import { $ } from 'vue/macros'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { useTree, mouseTree } from './hooks/index'
import STreeNode from '../component/tree-node'

export default defineComponent({
  name: 'STree',
  props: treeProps,

  setup(props: TreeProps, { slots, emit }) {
    const { data: treeData } = $(props)
    const { onMouseover, onMouseout } = mouseTree()
    const {
      toggleNode,
      getExpandedTree,
      toggleCheckNode,
      appendNode,
      removeNode
    } = useTree(treeData)
    provide('TREE_UTILS', {
      toggleNode,
      toggleCheckNode,
      appendNode,
      removeNode
    })

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
        <div style={{ userSelect: 'none' }}>
          {getExpandedTree.value.map(
            node =>
              node.isShow && (
                <STreeNode node={node} {...props}>
                  {{
                    icon: () => (slots.icon ? slots.icon(node) : ''),
                    switcherIcon: () =>
                      node.hasOwnProperty('expanded')
                        ? slots.switcherIcon
                          ? slots.switcherIcon(node.expanded)
                          : defaultswitcherIcon(node)
                        : ''
                  }}
                </STreeNode>
              )
          )}
        </div>
      )
    }
  }
})
