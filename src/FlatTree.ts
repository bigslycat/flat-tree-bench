import { NormalizedTree } from './NormalizedTree'

export type FlatTree = readonly FlatTree.Item[]

export namespace FlatTree {
  export interface Item {
    readonly treeIndex: number
    readonly node: NormalizedTree.Node
  }
}
