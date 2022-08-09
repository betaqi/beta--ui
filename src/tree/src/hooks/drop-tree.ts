import { IInnerTreeNode, ITreeNode } from '../tree-types'

export function dropTree(getChildrenFn: any) {
  const dragstart = (e: DragEvent, node: IInnerTreeNode) => {
    let nodes = [node]
    if (e.target instanceof HTMLElement) {
      if (node.hasOwnProperty('expanded')) {
        nodes = [node, ...getChildrenFn([node])]
      }
    }
    e.dataTransfer?.setData('nodes', JSON.stringify(nodes))
  }

  const dragenter = (e: DragEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.border = '1px solid black'
    }
  }

  const dragleave = (e: DragEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.border = ''
    }
  }
  const dragover = (e: DragEvent) => {
    e.preventDefault()
  }
  const drop = (e: DragEvent, currNode: IInnerTreeNode) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.border = ''
    }
  }
  const dragend = (e: DragEvent) => {}

  return {
    dragstart,
    dragenter,
    dragleave,
    dragover,
    drop,
    dragend
  }
}
