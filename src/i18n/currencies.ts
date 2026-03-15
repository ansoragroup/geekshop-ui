import type { CurrencyCode, CurrencyConfig } from './types';

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  UZS: {
    code: 'UZS',
    symbol: { uz: "so'm", ru: 'сум', en: 'UZS' },
    decimals: 0,
    numberLocale: 'ru-RU',
  },
  USD: {
    code: 'USD',
    symbol: { uz: '$', ru: '$', en: '$' },
    decimals: 2,
    numberLocale: 'en-US',
  },
  RUB: {
    code: 'RUB',
    symbol: { uz: '₽', ru: '₽', en: '₽' },
    decimals: 0,
    numberLocale: 'ru-RU',
  },
  EUR: {
    code: 'EUR',
    symbol: { uz: '€', ru: '€', en: '€' },
    decimals: 2,
    numberLocale: 'de-DE',
  },
};
