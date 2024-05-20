import { isValidEmail } from './checkEmail'

describe('checkEmail', () => {
  const email1 = 'bobokhuja@yandex.ru'
  const email2 = '1bobokhuja@gmail.com'
  const email3 = '1bobokhuja@gmail'
  test('correctly', () => {
    expect(isValidEmail(email1)).toBe(true)
    expect(isValidEmail(email2)).toBe(true)
  })

  test('error email', () => {
    expect(isValidEmail(email3)).toBe(false)
    expect(isValidEmail(email2)).toBe(true)
  })
})
