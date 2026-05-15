/**
 * Scale every numeric token in a display string by `factor`.
 *
 * Handles formatted figures like `€ 1,234.56`, `+ € 600.00`, `142`, `+8`, etc.
 * Preserves currency symbols, thousand-separators, and surrounding text.
 * Does NOT touch strings without numeric tokens (e.g. dates are NOT a target —
 * callers should avoid passing date or reference strings).
 */
export function scaleAmount(s: string, factor: number): string {
  if (factor === 1) return s
  return s.replace(/(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)/g, (match) => {
    const hasDecimal = match.includes('.')
    const n = parseFloat(match.replace(/,/g, ''))
    if (!Number.isFinite(n)) return match
    const scaled = n * factor
    return scaled.toLocaleString('en-IE', {
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: hasDecimal ? 2 : 0,
    })
  })
}
