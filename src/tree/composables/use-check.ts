import { Ref } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseCore, UseCheck } from './use-tree-type'

export function useCheck(
  treeData: Ref<IInnerTreeNode[]>,
  { getChildren }: UseCore
): UseCheck {
  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked
    node.half = false
    // 父->子联动
    getChildren([node]).forEach(child => {
      child.checked = node.checked
      child.half = false
    })
    // 子->父联动
    const parentNode = treeData.value.find(n => n.id === node.parentId)
    if (!parentNode) return
    checkParentSelect(parentNode)
  }

  const checkParentSelect = (parentNode: IInnerTreeNode) => {
    const siblings = getChildren([parentNode], true)
    const checkedSiblings = siblings.filter(item => item.checked)
    if (checkedSiblings.length > 0) parentNode.half = true
    if (checkedSiblings.length === 0) parentNode.half = false
    if (checkedSiblings.length === siblings.length) {
      parentNode.half = false
      parentNode.checked = true
      const grandNode = treeData.value.find(n => n.id === parentNode.parentId)
      if (grandNode) checkParentSelect(grandNode)
    } else {
      parentNode.checked = false
      const grandNode = treeData.value.find(n => n.id === parentNode.parentId)
      if (grandNode) checkParentSelect(grandNode)
    }
  }

  return {
    toggleCheckNode
  }
}
