import type { CurrencyCode, CurrencyConfig, Locale } from '../i18n/types';
import { CURRENCY_CONFIGS } from '../i18n/currencies';

/**
 * Format a number with space-separated thousands and optional decimals.
 * No currency symbol — use `formatPrice` for that.
 *
 * @example formatNumber(9149.85) → "9 149.85"
 * @example formatNumber(8900000) → "8 900 000"
 */
export function formatNumber(value: number): string {
  const isDecimal = value % 1 !== 0;
  const str = isDecimal ? value.toFixed(2) : Math.floor(value).toString();
  const [intPart, decPart] = str.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decPart ? `${formatted}.${decPart}` : formatted;
}

export function formatWithConfig(
  amount: number,
  config: CurrencyConfig,
  locale: Locale,
  options?: { showCurrency?: boolean },
): string {
  const { showCurrency = true } = options ?? {};
  const formatted = new Intl.NumberFormat(config.numberLocale, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
    useGrouping: true,
  }).format(amount);

  if (!showCurrency) return formatted;

  const symbol = config.symbol[locale];
  // $ and € are prefix, everything else is suffix
  const isPrefix = symbol === '$' || symbol === '€';
  return isPrefix ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
}

export function formatPrice(
  amount: number,
  currencyCode: CurrencyCode = 'UZS',
  locale: Locale = 'uz',
  options?: { showCurrency?: boolean },
): string {
  return formatWithConfig(amount, CURRENCY_CONFIGS[currencyCode], locale, options);
}

/**
 * Abbreviate large numbers with K/M suffix.
 * Useful for follower counts, review counts, etc.
 *
 * @example formatCount(500) → "500"
 * @example formatCount(1500) → "1.5K"
 * @example formatCount(10000) → "10K"
 * @example formatCount(1500000) → "1.5M"
 */
export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (n >= 10_000) {
    return `${(n / 1000).toFixed(0)}K`;
  }
  if (n >= 1_000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

/**
 * Format price in compact form for space-constrained UIs (flash deals, badges).
 * Produces "1.2M", "150K", etc.
 *
 * @example formatCompactPrice(8900000) → "8.9M"
 * @example formatCompactPrice(150000) → "150K"
 * @example formatCompactPrice(500) → "500"
 */
export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const k = value / 1_000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(0)}K`;
  }
  return value.toString();
}
