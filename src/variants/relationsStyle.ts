import { NormalizedTree } from '../NormalizedTree'
import type { FlatTree } from '../FlatTree'

export function buildFlatTree(normalizedTree: NormalizedTree): FlatTree {
  const relations = buildRelations(normalizedTree)
  return buildTree(normalizedTree, relations)
}

function buildTree(
  normalizedTree: NormalizedTree,
  relations: Relations,
): FlatTree {
  const result: FlatTree.Item[] = []

  let treeIndex = 0

  for (const key in normalizedTree) {
    if (
      Object.prototype.hasOwnProperty.call(normalizedTree, key) &&
      !normalizedTree[key].parentKey
    ) {
      handleNode(normalizedTree[key])
    }
  }

  function handleNode(node: NormalizedTree.Node) {
    result.push({ treeIndex, node })
    treeIndex += 1
    relations[node.key]?.forEach(handleNode)
  }

  return result
}

function buildRelations(normalizedTree: NormalizedTree): Relations {
  const relations: { [nodeKey: string]: NormalizedTree.Node[] } = {}

  for (const key in normalizedTree) {
    if (!Object.prototype.hasOwnProperty.call(normalizedTree, key)) continue

    const normalizedTreeNode = normalizedTree[key]

    if (!normalizedTreeNode.parentKey) continue

    const relationsToParentNode =
      relations[normalizedTreeNode.parentKey] ||
      (relations[normalizedTreeNode.parentKey] = [])

    relationsToParentNode.push(normalizedTreeNode)
  }

  return relations
}

interface Relations {
  readonly [nodeKey: string]: undefined | readonly NormalizedTree.Node[]
}
