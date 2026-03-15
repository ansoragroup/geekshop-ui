/** Supported locale codes */
export type Locale = 'uz' | 'ru' | 'en';

/** ISO 4217 currency codes */
export type CurrencyCode = 'UZS' | 'USD' | 'RUB' | 'EUR';

/** Currency display configuration */
export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: Record<Locale, string>;
  decimals: number;
  numberLocale: string;
}

/** Translation dictionary shape */
export type TranslationDictionary = Record<string, string>;
