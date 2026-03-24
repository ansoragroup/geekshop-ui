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
