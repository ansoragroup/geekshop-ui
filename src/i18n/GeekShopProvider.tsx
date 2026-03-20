import { createContext, useContext, useMemo, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Locale, CurrencyCode, CurrencyConfig, TranslationDictionary, Platform } from './types';
import { CURRENCY_CONFIGS } from './currencies';
import { TRANSLATIONS } from './translations';
import { formatWithConfig } from '../utils/formatPrice';
import type { Theme } from '../theme';
import { setTheme as applyTheme } from '../theme';

export interface GeekShopContextValue {
  locale: Locale;
  currency: CurrencyCode;
  platform: Platform;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatPrice: (amount: number, options?: { currency?: CurrencyCode; showCurrency?: boolean }) => string;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    return key in params ? String(params[key]) : `{${key}}`;
  });
}

function createTranslator(
  locale: Locale,
  customTranslations?: Partial<Record<Locale, TranslationDictionary>>,
) {
  const builtIn = TRANSLATIONS[locale] ?? TRANSLATIONS.uz;
  const custom = customTranslations?.[locale];
  const merged = custom ? { ...builtIn, ...custom } : builtIn;

  return (key: string, params?: Record<string, string | number>): string => {
    const template = merged[key];
    if (template === undefined) return key;
    return interpolate(template, params);
  };
}

function createPriceFormatter(locale: Locale, currencyCode: CurrencyCode) {
  const config: CurrencyConfig = CURRENCY_CONFIGS[currencyCode];

  return (amount: number, options?: { currency?: CurrencyCode; showCurrency?: boolean }): string => {
    const effectiveConfig = options?.currency
      ? CURRENCY_CONFIGS[options.currency]
      : config;
    return formatWithConfig(amount, effectiveConfig, locale, {
      showCurrency: options?.showCurrency,
    });
  };
}

const DEFAULT_CONTEXT: GeekShopContextValue = {
  locale: 'uz',
  currency: 'UZS',
  platform: 'mobile',
  t: createTranslator('uz'),
  formatPrice: createPriceFormatter('uz', 'UZS'),
};

const GeekShopContext = createContext<GeekShopContextValue>(DEFAULT_CONTEXT);

export interface GeekShopProviderProps {
  locale?: Locale;
  currency?: CurrencyCode;
  platform?: Platform;
  theme?: Theme;
  translations?: Partial<Record<Locale, TranslationDictionary>>;
  children: ReactNode;
}

export function GeekShopProvider({
  locale = 'uz',
  currency = 'UZS',
  platform = 'mobile',
  theme,
  translations,
  children,
}: GeekShopProviderProps) {
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return createTranslator(locale, translations)(key, params);
    },
    [locale, translations],
  );

  const formatPriceFn = useCallback(
    (amount: number, options?: { currency?: CurrencyCode; showCurrency?: boolean }) => {
      return createPriceFormatter(locale, currency)(amount, options);
    },
    [locale, currency],
  );

  const value = useMemo<GeekShopContextValue>(
    () => ({
      locale,
      currency,
      platform,
      t,
      formatPrice: formatPriceFn,
    }),
    [locale, currency, platform, t, formatPriceFn],
  );

  return <GeekShopContext value={value}>{children}</GeekShopContext>;
}

export function useGeekShop(): GeekShopContextValue {
  return useContext(GeekShopContext);
}
