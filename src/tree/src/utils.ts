import type { ITreeNode, IInnerTreeNode } from './tree-types'
export function generateInnerTree(
  tree: ITreeNode[],
  level = 0,
  path = {} as IInnerTreeNode
): IInnerTreeNode[] {
  level++
  return tree.reduce((prev, curr) => {
    let o = { ...curr } as IInnerTreeNode
    o.level = level
    o.checked = false
    o.isShow = true
    if (JSON.stringify(path) !== '{}') o.parentId = path.id
    if (curr.children) {
      o.half = false
      o.expanded = true
      delete o.children
      return prev.concat(o, generateInnerTree(curr.children, level, o))
    } else {
      o.isLeaf = true
      return prev.concat(o)
    }
  }, [] as IInnerTreeNode[])
}
