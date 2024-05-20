export const sortObjectKeys = (obj: object) => {
  const copy = JSON.parse(JSON.stringify(obj))
  const sortedKeys = Object.keys(obj).sort()
  const sortedObj: any = {}
  sortedKeys.forEach((key) => {
    sortedObj[key] = copy[key]
  })
  return sortedObj
}
