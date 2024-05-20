import { getMaxId } from './getMaxId'

describe('getMinId test', () => {
  const ids = [1, 2, 10, 15, 2, 4, 18, 39, 29]

  test('correct value', () => {
    expect(getMaxId(ids)).toBe(39)
    expect(getMaxId(ids)).not.toBe(1)
  })
})
