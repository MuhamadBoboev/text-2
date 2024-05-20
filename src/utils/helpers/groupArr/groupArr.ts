export const groupArr = (arr: any[], groupCount: number): any[] => {
  const resArr: any[] = []
  let groupArr: any[] = []

  arr.forEach((item, index) => {
    if (groupArr.length === groupCount) {
      resArr.push(groupArr)
      groupArr = []
    }

    groupArr.push(item)

    if (arr.length - 1 === index) {
      resArr.push(groupArr)
    }
  })
  return resArr
}
