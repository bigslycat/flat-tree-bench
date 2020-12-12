import { NormalizedTree } from './NormalizedTree'
import type { FlatTree } from './FlatTree'
import * as variants from './variants'

const poll: ReadonlyArray<
  readonly [
    keyof typeof variants,
    { buildFlatTree(normalizedTree: NormalizedTree): readonly FlatTree.Item[] },
  ]
> = Object.entries(variants) as any

const maxNestingLevel = 5
const maxChild = 5

console.log('\nMax nesting level:', maxNestingLevel)
console.log('Max child count:', maxChild)
console.log('Total nodes count:', maxChild * powSum(maxChild, maxNestingLevel))

const buildStartTime = Date.now()
const normalizedTree = NormalizedTree.generate(maxNestingLevel, maxChild)
const buildTime = Date.now() - buildStartTime

console.log(`\nRaw tree build time: ${buildTime}ms`)

const results: Record<keyof typeof variants, number> = {
  fpStyle: 0,
  generatorStyle: 0,
  relationsStyle: 0,
  walkStyle: 0,
}

poll.forEach(([name, { buildFlatTree }]) => {
  const tree = { ...normalizedTree }

  const started = Date.now()

  buildFlatTree(tree)

  const result = Date.now() - started

  results[name] += result
})

console.log(
  Object.entries(results)
    .sort(([, a], [, b]) => a - b)
    .map(([name, value]) => `${name}: ${value}ms`)
    .join('\n'),
)

function powSum(base: number, n: number) {
  return (base ** (n + 1) - 1) / (base - 1)
}
