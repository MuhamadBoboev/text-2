export function replaceAll(str: string, match: any, newStr: any) {
  // If a regex pattern
  if (
    Object.prototype.toString.call(match).toLowerCase() === '[object regexp]'
  ) {
    return str.replace(match, newStr)
  }

  // If a string
  return str.replace(new RegExp(match, 'g'), newStr)
}
