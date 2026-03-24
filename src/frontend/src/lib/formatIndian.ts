/**
 * Format a number in Indian number system (e.g., 100000 → ₹1,00,000)
 */
export function formatIndianAmount(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  const str = num.toString();
  if (str.length <= 3) return `₹${str}`;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
  return `₹${formatted}`;
}

export function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
