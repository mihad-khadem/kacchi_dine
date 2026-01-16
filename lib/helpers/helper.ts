function getDisplayPrice(
  prices?: number | { one?: number; three?: number; five?: number }
) {
  if (typeof prices === "number") return prices;

  if (typeof prices === "object" && prices !== null) {
    return prices.one ?? prices.three ?? prices.five ?? 0;
  }

  return 0;
}
export { getDisplayPrice };
