import { replaceAll } from './replaceAll'

describe('replaceAll', () => {
  const mock1 = 'Сфер деятельности'
  const resMock1 = 'Сфер <span class="test">деятельности</span>'

  test('test str', () => {
    expect(
      replaceAll(
        mock1,
        'деятельности',
        '<span class="test">деятельности</span>',
      ),
    )
  })
})
