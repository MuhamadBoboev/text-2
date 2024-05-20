export const getNextId = (currentId: number, ids: number[]): number | null => {
  const sortedIds = ids.sort((a, b) => (a > b ? -1 : 1))
  let nextId: number | null = null

  sortedIds.forEach((id) => {
    if (id > currentId) {
      nextId = id
    }
    return
  })

  return nextId
}
