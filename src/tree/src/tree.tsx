import { defineComponent, provide, SetupContext } from 'vue'
import { $ } from 'vue/macros'
import { IInnerTreeNode, ITreeNode, TreeProps, treeProps } from './tree-types'
import { useTree } from '../composables/use-tree'
import STreeNode from '../component/tree-node'
import '../style/tree.scss'
import VirtualList from '../component/virtual-list'

export default defineComponent({
  name: 'STree',
  props: treeProps,
  emits: ['lazy-load'],

  setup(props: TreeProps, context: SetupContext) {
    const { slots } = context
    const { data: treeData, height } = $(props)
    const {
      toggleNode,
      ExpandedTree,
      toggleCheckNode,
      appendNode,
      removeNode,
      dragStart,
      dragOver,
      dragleave,
      drop,
      dragend
    } = useTree(treeData, context)

    provide('TREE_UTILS', {
      toggleNode,
      toggleCheckNode,
      appendNode,
      removeNode,
      dragStart,
      dragOver,
      dragleave,
      drop,
      dragend
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

    const TreeNode = (node: IInnerTreeNode) => {
      return (
        <STreeNode node={node} checkable operable drag>
          {{
            icon: () => (slots.icon ? slots.icon(node) : ''),
            switcherIcon: () =>
              node.hasOwnProperty('expanded')
                ? slots.switcherIcon
                  ? slots.switcherIcon(node.expanded)
                  : defaultswitcherIcon(node)
                : '',
            loading: () =>
              slots.loading ? slots.loading(node) : <span>loading...</span>
          }}
        </STreeNode>
      )
    }

    return () => {
      return (
        <div style={{ userSelect: 'none', width: '1000px' }}>
          {height ? (
            <div style={{ height: `${height}px` }}>
              <VirtualList data={ExpandedTree.value}>
                {{
                  default: (node: IInnerTreeNode) => {
                    return TreeNode(node)
                  }
                }}
              </VirtualList>
            </div>
          ) : (
            ExpandedTree.value.map(node => TreeNode(node))
          )}
        </div>
      )
    }
  }
})
