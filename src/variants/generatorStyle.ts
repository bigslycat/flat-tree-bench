import { NormalizedTree } from '../NormalizedTree'
import type { FlatTree } from '../FlatTree'

export function buildFlatTree(normalizedTree: NormalizedTree): FlatTree {
  return [...generateFlatTree(normalizedTree)]
}

function* generateFlatTree(
  normalizedTree: NormalizedTree,
): Generator<FlatTree.Item, void, unknown> {
  const generator = generateTree(normalizedTree)

  for (
    let res = generator.next(), treeIndex = 0;
    !res.done;
    res = generator.next(), treeIndex += 1
  ) {
    yield {
      treeIndex,
      node: res.value,
    }
  }
}

function* generateTree(
  normalizedTree: NormalizedTree,
  parentKey?: string,
): Generator<NormalizedTree.Node, void, unknown> {
  for (const key in normalizedTree) {
    if (!Object.prototype.hasOwnProperty.call(normalizedTree, key)) {
      continue
    }

    const normalizedTreeNode = normalizedTree[key]

    if (normalizedTreeNode.parentKey !== parentKey) continue

    yield normalizedTreeNode

    const generator = generateTree(normalizedTree, normalizedTreeNode.key)

    for (let res = generator.next(); !res.done; res = generator.next()) {
      yield res.value
    }
  }
}
