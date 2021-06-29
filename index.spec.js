const assert = require('assert')
const pickx = require('./')

const { deepStrictEqual } = assert

const createRandom = (rands) => {
  let index = 0
  return () => rands[index++]
}

describe('pickx', () => {
  describe('without weight', () => {
    it('single pick', () => {
      const re = pickx([1, 2, 3], { count: 1, random: createRandom([0.5]) })
      deepStrictEqual(re, [2])
    })

    it('count default 1', () => {
      const re = pickx([1, 2, 3], { random: createRandom([0.5]) })
      deepStrictEqual(re, [2])
    })

    it('multiple pick', () => {
      const re = pickx([1, 2, 3], {
        count: 2,
        random: createRandom([0.5, 0.6]),
      })
      deepStrictEqual(re, [2, 3])
    })

    it('count check', () => {
      const re1 = pickx([1, 2, 3], {
        count: 3,
      })
      deepStrictEqual(re1, [1, 2, 3])

      const re2 = pickx([1, 2, 3], {
        count: 6,
      })
      deepStrictEqual(re2, [1, 2, 3])
    })
  })

  describe('with weight', () => {
    it('single pick', () => {
      const re = pickx([1, 2, 3], [1, 2, 3], {
        count: 1,
        random: createRandom([0.5, 0.8, 0.3]),
      })
      deepStrictEqual(re, [2])
    })

    it('count default 1', () => {
      const re = pickx([1, 2, 3], [1, 2, 3], {
        random: createRandom([0.5, 0.8, 0.3]),
      })
      deepStrictEqual(re, [2])
    })

    it('multiple pick', () => {
      const re = pickx([1, 2, 3], [1, 2, 3], {
        count: 2,
        random: createRandom([0.5, 0.8, 0.3]),
      })
      deepStrictEqual(re, [2, 3])
    })

    it('object values', () => {
      const re = pickx(
        { 1: 1, 2: 2, 3: 3 },
        {
          count: 2,
          random: createRandom([0.5, 0.8, 0.3]),
        }
      )
      deepStrictEqual(re, ['2', '3'])
    })

    it('should throw error', () => {
      assert.throws(() => pickx([1, 2, 3], [1, 2]), {
        name: 'Error',
        message: "values don't match weights",
      })

      assert.throws(() => pickx([1, 2, 3], [1, 2, null]), {
        name: 'Error',
        message: 'weight should be a positive number',
      })

      assert.throws(() => pickx([1, 2, 3], [1, 2, 0]), {
        name: 'Error',
        message: 'weight should be a positive number',
      })
    })

    it('count check', () => {
      const re1 = pickx([1, 2, 3], [1, 2, 3], {
        count: 3,
      })
      deepStrictEqual(re1, [1, 2, 3])

      const re2 = pickx([1, 2, 3], [1, 2, 3], {
        count: 6,
      })
      deepStrictEqual(re2, [1, 2, 3])
    })
  })
})
