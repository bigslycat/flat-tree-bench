import { NormalizedTree } from '../NormalizedTree'
import type { FlatTree } from '../FlatTree'

export function buildFlatTree(normalizedTree: NormalizedTree): FlatTree {
  let treeIndex = 0

  const result: FlatTree.Item[] = []

  walkTree(node => {
    result.push({ treeIndex, node })
    treeIndex += 1
  }, normalizedTree)

  return result
}

function walkTree(
  listener: (node: NormalizedTree.Node) => unknown,
  normalizedTree: NormalizedTree,
  parentKey?: string,
) {
  for (const key in normalizedTree) {
    if (!Object.prototype.hasOwnProperty.call(normalizedTree, key)) continue
    const normalizedTreeNode = normalizedTree[key]
    if (normalizedTreeNode.parentKey !== parentKey) continue

    listener(normalizedTreeNode)

    walkTree(listener, normalizedTree, normalizedTreeNode.key)
  }
}
