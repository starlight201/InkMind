export function formatNumber(value, options = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value ?? "");

  const hasDecimal = !Number.isInteger(number);
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
}

export function formatPercent(value) {
  return `${formatNumber(value)}%`;
}
