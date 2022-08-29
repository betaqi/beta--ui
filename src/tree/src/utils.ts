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

export function getLabelName(child: IInnerTreeNode[]) {
  let lastStr = ''
  let allLastStr = []
  for (const { label } of child) {
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
