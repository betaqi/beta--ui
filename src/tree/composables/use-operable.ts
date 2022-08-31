import { Ref, ref } from 'vue'
import { IInnerTreeNode } from '../src/tree-types'
import { UseCore, UseOperable } from './use-tree-type'

export function useOperable(
  treeData: Ref<IInnerTreeNode[]>,
  { getChildren, getIndex }: UseCore
): UseOperable {
  const appendNode = (parent: IInnerTreeNode) => {
    let length = 0
    const child = getChildren([parent], true)
    const lastChild = child[child.length - 1]
    const label = getLabelName(child)
    let insertedIndex = getIndex(parent) + 1

    if (lastChild) {
      insertedIndex = getIndex(lastChild) + 1
      length = getChildren([lastChild]).length
    }

    parent.expanded = true
    parent.isLeaf = false
    const newNode = ref({
      label,
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true,
      isShow: true,
      id: (Math.random() * 10000).toString()
    })

    treeData.value.splice(insertedIndex + length, 0, newNode.value)
  }

  const removeNode = (node: IInnerTreeNode) => {
    const ids = getChildren([node]).map(child => child.id)
    treeData.value = treeData.value.filter(
      item => item.id !== node.id && !ids.includes(item.id)
    )

    const parentNode = treeData.value.find(n => n.id === node.parentId)
    if (parentNode && getChildren([parentNode]).length === 0) {
      parentNode.isLeaf = true
      Reflect.deleteProperty(parentNode, 'expanded')
    }
  }

  return {
    appendNode,
    removeNode
  }
}

function getLabelName(children: IInnerTreeNode[]) {
  let lastStr = ''
  let allLastStr = []
  for (const { label } of children) {
    const name = label.indexOf('new node ')
    if (name === 0) {
      const index = label.lastIndexOf(' ')
      const lastStr = label.substring(index + 1, label.length)
      allLastStr.push(lastStr)
    }
  }

  const num = allLastStr.length + 2
  for (let index = 2; index < num; index++) {
    if (!allLastStr.includes(index.toString())) {
      lastStr = index.toString()
      break
    }
  }

  return `new node ${lastStr}`
}
