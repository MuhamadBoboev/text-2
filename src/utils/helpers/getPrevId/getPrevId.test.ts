import { getPrevId } from './getPrevId'

describe('getPrevId', () => {
  const mock1 = [2, 10, 23, 24, 5, 20, 11, 75, 99, 1]

  test('correct', () => {
    expect(getPrevId(23, mock1)).toBe(20)
  })

  test('null id', () => {
    expect(getPrevId(1, mock1)).toBeNull()
  })

  test('correct 2', () => {
    expect(getPrevId(24, mock1)).toBe(23)
  })
})
