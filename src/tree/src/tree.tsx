import { computed, defineComponent } from 'vue'
import { $ref, $ } from 'vue/macros'
import { IInnerTreeNode, ITreeNode, TreeProps, treeProps } from './tree-types'

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots, emit }) {
    const { data: treeData } = $(props)
    const toggleNode = (node: IInnerTreeNode) => {
      node.expanded = !node.expanded
    }
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
    const getExpandedTree = computed(() => {
      let excludeNodes: IInnerTreeNode[] = []
      let result: IInnerTreeNode[] = []
      let expandedNodes = treeData.filter(
        node => node.hasOwnProperty('expanded') && !node.expanded
      )
      if (expandedNodes.length > 0) {
        excludeNodes = getChildren(expandedNodes)
        result = treeData.filter(
          node => !excludeNodes.some(exclud => exclud.id === node.id)
        )
      }
      return excludeNodes.length > 0 ? result : treeData
    })
    const getChildren = (
      nodes: IInnerTreeNode[],
      result: IInnerTreeNode[] = []
    ) => {
      let children = treeData.filter(item =>
        nodes.some(node => node.id === item.parentId)
      )
      if (children.length > 0) {
        result.push(...children)
        getChildren(children, result)
      }
      return result
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
