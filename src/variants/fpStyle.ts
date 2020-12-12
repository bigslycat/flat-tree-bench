import { NormalizedTree } from '../NormalizedTree'
import type { FlatTree } from '../FlatTree'

export function buildFlatTree(normalizedTree: NormalizedTree): FlatTree {
  return buildTree(normalizedTree).map((node, treeIndex) => ({
    treeIndex,
    node,
  }))
}

function buildTree(
  normalizedTree: NormalizedTree,
  parentKey?: string,
): readonly NormalizedTree.Node[] {
  const result: NormalizedTree.Node[] = []

  for (const key in normalizedTree) {
    if (!Object.prototype.hasOwnProperty.call(normalizedTree, key)) continue
    const normalizedTreeNode = normalizedTree[key]
    if (normalizedTreeNode.parentKey !== parentKey) continue

    result.push(normalizedTreeNode)

    buildTree(normalizedTree, normalizedTreeNode.key).forEach(child =>
      result.push(child),
    )
  }

  return result
}
