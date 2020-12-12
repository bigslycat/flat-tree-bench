import { randomBytes } from 'crypto'

export interface NormalizedTree {
  readonly [key: string]: NormalizedTree.Node
}

export namespace NormalizedTree {
  export interface Node {
    readonly key: string
    readonly parentKey?: string
  }

  export function generate(
    maxNestingLevel: number,
    maxChild: number,
    shuffle?: boolean,
  ): NormalizedTree {
    const result: { [key: string]: NormalizedTree.Node } = {}

    for (let index = 0; index < maxChild; index++) {
      createNode()
    }

    function createNode(level: number = 0, parentKey?: string) {
      const key = createId(result)
      result[key] = { key, parentKey }
      if (level === maxNestingLevel) return
      for (let index = 0; index < maxChild; index++) {
        createNode(level + 1, key)
      }
    }

    return shuffle ? shuffleTree(result) : result
  }

  function createId(tree: NormalizedTree): string {
    const result = randomBytes(4).toString('hex')
    if (tree[result]) return createId(tree)
    return result
  }

  const shuffleTree = shuffle

  export function shuffle(tree: NormalizedTree): NormalizedTree {
    const keys: readonly string[] = Object.keys(tree)
    const entries = Object.entries(tree)

    const lastIndex = keys.length - 1

    for (let oldIndex = 0; oldIndex < entries.length; oldIndex++) {
      const oldEntry = entries[oldIndex]

      const newIndex = getRandomInt(0, lastIndex)
      const newEntry = entries[newIndex]

      entries[oldIndex] = newEntry
      entries[newIndex] = oldEntry
    }

    return entries.reduce<{ [key: string]: NormalizedTree.Node }>(
      (acc, [key, node]) => {
        acc[key] = node
        return acc
      },
      {},
    )
  }

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
