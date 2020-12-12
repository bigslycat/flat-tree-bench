import { NormalizedTree } from './NormalizedTree'

import data from './variants/testData.json'

describe('NormalizedTree', () => {
  describe('shuffle()', () => {
    it('shuffles entry order', () => {
      expect(data).toEqual(NormalizedTree.shuffle(data))
    })
  })
})
