import { IInnerTreeNode } from '../src/tree-types'
import { UseDrag, UseCore, IDragState } from './use-tree-type'

export function useDrag(
  treeData: Ref<IInnerTreeNode[]>,
  { getIndex, getNode, getParent, getChildren }: UseCore
): UseDrag {
  const dragState = reactive<IDragState>({
    dropType: undefined,
    draggingNode: null
  })

  const dropClassMap = {
    dropPrev: 'node-drop-prev',
    dropNext: 'node-drop-next',
    dropInner: 'node-drop-inner'
  }

  const currParentElement = ref<HTMLElement>()

  watch(currParentElement, (newVal, oldVal) => {
    if (oldVal) {
      removeDroppingClass(oldVal)
    }
  })

  const dragStart = (e: DragEvent, node: IInnerTreeNode) => {
    e.stopPropagation()
    ;(e.target as HTMLElement).style.opacity = '0.6'
    dragState.draggingNode = e.target as HTMLElement | null
    e.dataTransfer?.setData('node', JSON.stringify(node))
  }

  const dragOver = (e: DragEvent, node: IInnerTreeNode) => {
    e.preventDefault()
    let droppingType: IDragState['dropType']
    const elementNode = e.currentTarget as HTMLElement

    droppingType = getDragType(e, elementNode, node)
    dragState.dropType = droppingType

    if (droppingType) {
      const classList = elementNode.classList
      if (!classList.contains(dropClassMap[droppingType])) {
        removeDroppingClass(elementNode)
        classList.add(dropClassMap[droppingType])
      }
    } else {
      removeDroppingClass(elementNode)
    }

    const parent = getParent(node)
    if (!parent) return
    currParentElement.value = document.querySelector(
      `#${parent.id}`
    ) as HTMLElement
    // ?.parentNode as HTMLElement

    if (droppingType !== 'dropInner') {
      currParentElement.value.classList.add('node-drop-parent')
    } else {
      removeDroppingClass(currParentElement.value)
    }
  }

  const dragleave = (e: DragEvent) => {
    removeDroppingClass(e.currentTarget as HTMLElement)
  }

  const drop = (e: DragEvent, dropNode: IInnerTreeNode) => {
    e.preventDefault()
    e.stopPropagation()
    removeDroppingClass(e.currentTarget as HTMLElement)
    removeDroppingClass(currParentElement.value as HTMLElement)
    let dragNode: IInnerTreeNode | undefined

    if (e.dataTransfer?.getData('node')) {
      const node = JSON.parse(e.dataTransfer?.getData('node'))
      dragNode = getNode(node)
      if (!dragNode) return
      const isDropInChildren = chenkDrop(dropNode, dragNode)
      if (
        dropNode.id === dragNode.id ||
        isDropInChildren ||
        !dragState.dropType
      ) {
        return
      }

      handleDrop(e, dragNode, dropNode)
    }
  }

  const handleDrop = (
    e: DragEvent,
    dragNode: IInnerTreeNode,
    dropNode: IInnerTreeNode
  ) => {
    let cloneDragNode: IInnerTreeNode = dragNode
    const dragChildren = getChildren([dragNode], true)
    const dragParent = getParent(dragNode)
    const dragIndex = getIndex(dragNode)
    treeData.value.splice(dragIndex, 1)
    const dropIndex = getIndex(dropNode)

    if (dragState.dropType === 'dropInner') {
      if (dropNode.hasOwnProperty('expanded')) {
        cloneDragNode = {
          ...dragNode,
          checked: false,
          parentId: dropNode.id,
          level: dropNode.level + 1
        }
        treeData.value.splice(dropIndex + 1, 0, cloneDragNode)
      }
    } else if (dragState.dropType === 'dropPrev') {
      cloneDragNode = {
        ...dragNode,
        checked: false,
        parentId: dropNode.parentId,
        level: dropNode.level
      }
      treeData.value.splice(dropIndex, 0, cloneDragNode)
    } else if (dragState.dropType === 'dropNext') {
      cloneDragNode = {
        ...dragNode,
        checked: false,
        parentId: dropNode.parentId,
        level: dropNode.level
      }
      const dropLength = getChildren([dropNode]).length
      treeData.value.splice(dropIndex + dropLength + 1, 0, cloneDragNode)
    }

    if (dragChildren.length) {
      dragState.dropType = 'dropInner'
      for (const child of dragChildren) {
        handleDrop(e, child, cloneDragNode)
      }
    }

    if (dragParent) {
      if (getChildren([dragParent], true).length === 0) {
        dragParent.isLeaf = true
        Reflect.deleteProperty(dragParent, 'expanded')
      }
    }
  }

  const getDragType = (
    e: DragEvent,
    elementNode: HTMLElement,
    node: IInnerTreeNode
  ) => {
    let result: IDragState['dropType']
    const mouseInClientY = e.clientY
    const elementNodePosition = elementNode.getBoundingClientRect()
    const mouseInElenemtY = mouseInClientY - elementNodePosition.y
    const part = node.isLeaf
      ? elementNodePosition.height / 2
      : elementNodePosition.height / 3

    if (mouseInElenemtY > -1 && mouseInElenemtY < part) {
      result = 'dropPrev'
    } else if (
      mouseInElenemtY > part * (node.isLeaf ? 1 : 2) &&
      mouseInElenemtY < elementNodePosition.height
    ) {
      result = 'dropNext'
    } else {
      result = 'dropInner'
    }

    return result
  }

  const chenkDrop = (drop: IInnerTreeNode, drag: IInnerTreeNode) => {
    const children = getChildren([drag])
    return children.some(child => child.id === drop.id)
  }

  const removeDroppingClass = (elementNode: HTMLElement | undefined) => {
    if (!elementNode) return
    elementNode.classList.remove(
      ...Object.values(dropClassMap),
      'node-drop-parent'
    )
  }

  const resetDragState = () => {
    dragState.dropType = undefined
    dragState.draggingNode = null
  }

  const dragend = (e: DragEvent) => {
    ;(e.target as HTMLElement).style.opacity = ''
    e.preventDefault()
    e.stopPropagation()
    resetDragState()
  }

  return {
    dragStart,
    dragOver,
    dragleave,
    drop,
    dragend
  }
}
