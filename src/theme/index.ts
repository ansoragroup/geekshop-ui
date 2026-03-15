import { THEME_PRESETS, type ThemePreset } from './presets';

export const tokens = {
  color: {
    primary: '#FF5000',
    primaryLight: '#FF7A33',
    primaryDark: '#E64800',
    primaryBg: '#FFF5F0',
    price: '#FF0000',
    priceDark: '#E8380D',
    sale: '#FF3B30',
    success: '#07C160',
    successLight: '#E8F8EF',
    warning: '#FFA726',
    warningLight: '#FFF8E6',
    error: '#FF3B30',
    info: '#1890FF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textPlaceholder: '#CCCCCC',
    textWhite: '#FFFFFF',
    textLink: '#FF5000',
    bgPage: '#F5F5F5',
    bgWhite: '#FFFFFF',
    bgCard: '#FFFFFF',
    bgOverlay: 'rgba(0, 0, 0, 0.5)',
    bgSkeleton: '#F0F0F0',
    border: '#EEEEEE',
    borderLight: '#F5F5F5',
    divider: '#F0F0F0',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
    primaryHeader: 'linear-gradient(180deg, #FF5000 0%, #FF8A56 50%, #FFB088 100%)',
  },
  spacing: {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    round: '9999px',
  },
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
    xxxl: '24px',
    priceSm: '14px',
    priceMd: '18px',
    priceLg: '24px',
    priceXl: '30px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  shadow: {
    sm: '0 1px 4px rgba(0, 0, 0, 0.04)',
    md: '0 2px 8px rgba(0, 0, 0, 0.06)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.08)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.12)',
    bottomBar: '0 -2px 8px rgba(0, 0, 0, 0.06)',
  },
  zIndex: {
    normal: 1,
    dropdown: 100,
    sticky: 200,
    fixed: 500,
    modalBackdrop: 900,
    modal: 1000,
    popover: 1100,
    toast: 1200,
  },
  transition: {
    fast: '0.15s ease',
    normal: '0.25s ease',
    slow: '0.35s ease',
    spring: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  layout: {
    navbarHeight: '44px',
    tabbarHeight: '50px',
    actionBarHeight: '56px',
    searchBarHeight: '36px',
    safeAreaBottom: 'env(safe-area-inset-bottom, 0px)',
    containerPadding: '12px',
  },
  breakpoint: {
    sm: '375px',
    md: '414px',
    lg: '768px',
  },
} as const;

export type Theme = 'light' | 'dark' | 'auto';

export function setTheme(theme: Theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
    // Falls back to prefers-color-scheme media query in global.scss
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function getTheme(): 'light' | 'dark' {
  if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function setThemePreset(preset: ThemePreset): void {
  const config = THEME_PRESETS[preset];
  if (!config) return;

  const root = document.documentElement;
  root.style.setProperty('--gs-color-primary', config.colors.primary);
  root.style.setProperty('--gs-color-primary-light', config.colors.primaryLight);
  root.style.setProperty('--gs-color-primary-dark', config.colors.primaryDark);
  root.style.setProperty('--gs-color-primary-bg', config.colors.primaryBg);
  root.style.setProperty('--gs-color-primary-gradient', config.colors.primaryGradient);
  root.style.setProperty('--gs-color-primary-gradient-header', config.colors.primaryGradientHeader);

  root.dataset.gsPreset = preset;
}

export function getThemePreset(): ThemePreset {
  return (document.documentElement.dataset.gsPreset as ThemePreset) || 'default';
}
