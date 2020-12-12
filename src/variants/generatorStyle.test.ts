import { buildFlatTree } from './generatorStyle'

import shuffledNormalizedTree from './testData.shuffled.json'
import shuffledFlatTree from './testData.shuffledFlatTree.json'

describe('generatorStyle', () => {
  describe('buildFlatTree()', () => {
    it('builds FlatTree from NormalizedTree', () => {
      const result = buildFlatTree(shuffledNormalizedTree)
      expect(result).toEqual(shuffledFlatTree)
    })
  })
})
