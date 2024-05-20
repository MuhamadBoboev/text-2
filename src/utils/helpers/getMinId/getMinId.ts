export const getMinId = (ids: number[]) =>
  ids.reduce((minId, id) => Math.min(minId, id), Infinity)
