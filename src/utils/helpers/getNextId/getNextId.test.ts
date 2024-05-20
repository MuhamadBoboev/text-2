import { getNextId } from './getNextId'

describe('getNextId', () => {
  const mock1 = [2, 10, 23, 24, 5, 20, 11, 75, 99, 1]
  const result1 = 23

  test('correct', () => {
    expect(getNextId(11, mock1)).toBe(20)
  })

  test('null id', () => {
    expect(getNextId(99, mock1)).toBeNull()
  })

  test('correct 2', () => {
    expect(getNextId(24, mock1)).toBe(75)
  })
})
