export function priceInDollar(priceInCents) {
  return (priceInCents / 100).toFixed(2);
}