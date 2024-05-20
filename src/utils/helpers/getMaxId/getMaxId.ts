export const getMaxId = (ids: number[]) =>
  ids.reduce((maxId, id) => Math.max(maxId, id), -Infinity)
