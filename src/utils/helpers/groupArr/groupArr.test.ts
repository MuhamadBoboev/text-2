import { groupArr } from './groupArr'

describe('groupArr', () => {
  const mock1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const resMock1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14],
  ]
  const resMock3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14],
  ]
  const mock2 = [1, 2, 3]

  const resMock2 = [[1, 2, 3]]
  const mock4 = [1, 2, 3, 4, 5]
  const resMock4 = [[1, 2, 3, 4], [5]]

  test('correct value', () => {
    expect(groupArr(mock1, 4)).toEqual(resMock1)
  })

  test('min value', () => {
    expect(groupArr(mock2, 4)).toEqual(resMock2)
  })

  test('groupCount 3', () => {
    expect(groupArr(mock1, 3)).toEqual(resMock3)
  })

  test('with 1 lishniy', () => {
    expect(groupArr(mock4, 4)).toEqual(resMock4)
  })
})
