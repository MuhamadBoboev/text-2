export const getPrevId = (currentId: number, ids: number[]): number | null => {
  const sortedIds = ids.sort((a, b) => (a > b ? 1 : -1))
  let prevId: number | null = null

  sortedIds.forEach((id) => {
    if (id < currentId) {
      prevId = id
    }
    return
  })

  return prevId
}
