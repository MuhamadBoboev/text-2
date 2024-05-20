import { getMinId } from './getMinId'

describe('getMinId test', () => {
  const ids = [1, 2, 10, 15, 2, 4, 18, 39, 29]

  test('correct value', () => {
    expect(getMinId(ids)).toBe(1)
    expect(getMinId(ids)).not.toBe(39)
  })
})
