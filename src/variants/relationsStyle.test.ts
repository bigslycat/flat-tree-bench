import { buildFlatTree } from './relationsStyle'

import shuffledNormalizedTree from './testData.shuffled.json'
import shuffledFlatTree from './testData.shuffledFlatTree.json'

describe('relationsStyle', () => {
  describe('buildFlatTree', () => {
    it('builds FlatTree from NormalizedTree', () => {
      const result = buildFlatTree(shuffledNormalizedTree)
      expect(result).toEqual(shuffledFlatTree)
    })
  })
})
