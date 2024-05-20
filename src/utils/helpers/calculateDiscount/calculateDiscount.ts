export const calculateDiscount = (price: number, percent: number): number => {
  return +(price - (price * percent) / 100).toFixed(2)
}
