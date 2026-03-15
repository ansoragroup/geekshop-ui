import type { CurrencyCode, CurrencyConfig, Locale } from '../i18n/types';
import { CURRENCY_CONFIGS } from '../i18n/currencies';

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
