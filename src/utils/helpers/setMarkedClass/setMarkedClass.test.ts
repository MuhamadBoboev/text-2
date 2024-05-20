import { setMarkedClass } from './setMarkedClass'

describe('getMinId test', () => {
  const mock1 = 'Успешно реализованных<br/> проектов'
  const mock2 = 'Лет успешно работаем<br/> на рынке СНГ'

  test('Mock 1', () => {
    expect(setMarkedClass(mock1, 'Успешно', 'hello')).toBe(
      '<span class="hello">Успешно</span> реализованных<br/> проектов',
    )
  })

  test('Mock 2', () => {
    expect(setMarkedClass(mock2, 'Лет', 'hello')).toBe(
      '<span class="hello">Лет</span> успешно работаем<br/> на рынке СНГ',
    )
  })

  test('No marked param', () => {
    expect(setMarkedClass(mock2, 'Л', 'hello')).toBe(
      '<span class="hello">Л</span>ет успешно работаем<br/> на рынке СНГ',
    )
  })
})
