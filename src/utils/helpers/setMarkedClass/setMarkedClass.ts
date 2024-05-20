import { replaceAll } from '@utils/helpers/replaceAll/replaceAll'

export const setMarkedClass = (
  str: string,
  marked?: string,
  className?: string,
): string => {
  if (!marked) return str
  if (!String.prototype.replaceAll)
    return replaceAll(str, marked, `<strong class="${className}">${marked}</b>`)
  return str.replaceAll(
    marked,
    `<strong class="${className}">${marked}</strong>`,
  )
}
