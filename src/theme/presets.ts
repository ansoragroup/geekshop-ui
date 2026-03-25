export type ThemePreset = 'default' | 'teal' | 'red' | 'yellow' | 'green' | 'monochrome' | 'dark';

export interface ThemePresetColors {
  // Primary family
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryBg: string;
  primaryGradient: string;
  primaryGradientHeader: string;
  // Price (should harmonize with theme, not always red)
  price: string;
  priceDark: string;
  // Sale/error
  sale: string;
  error: string;
  // Success
  success: string;
  successLight: string;
  // Warning
  warning: string;
  warningLight: string;
  // Info
  info: string;
  // Text link (usually matches primary)
  textLink: string;
}

export interface ThemePresetConfig {
  name: ThemePreset;
  label: string;
  colors: ThemePresetColors;
}

export const THEME_PRESETS: Record<ThemePreset, ThemePresetConfig> = {
  default: {
    name: 'default',
    label: 'GeekShop Orange',
    colors: {
      primary: '#FF5000',
      primaryLight: '#FF7A33',
      primaryDark: '#E64800',
      primaryBg: '#FFF5F0',
      primaryGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #FF5000 0%, #FF8A56 50%, #FFB088 100%)',
      price: '#FF0000',
      priceDark: '#E8380D',
      sale: '#FF3B30',
      error: '#FF3B30',
      success: '#07C160',
      successLight: '#E8F8EF',
      warning: '#FFA726',
      warningLight: '#FFF8E6',
      info: '#1890FF',
      textLink: '#FF5000',
    },
  },
  teal: {
    name: 'teal',
    label: 'Teal Tech',
    colors: {
      primary: '#00CBCC',
      primaryLight: '#33D6D6',
      primaryDark: '#00A8A8',
      primaryBg: '#E6FAFA',
      primaryGradient: 'linear-gradient(135deg, #00CBCC 0%, #33D6D6 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #00CBCC 0%, #4DE0E0 50%, #99EDED 100%)',
      price: '#FF6B6B',
      priceDark: '#E55A5A',
      sale: '#FF6B6B',
      error: '#FF6B6B',
      success: '#2DD4A8',
      successLight: '#E6F9F3',
      warning: '#FFB347',
      warningLight: '#FFF5E6',
      info: '#00CBCC',
      textLink: '#00CBCC',
    },
  },
  red: {
    name: 'red',
    label: 'Classic Red',
    colors: {
      primary: '#E53935',
      primaryLight: '#EF5350',
      primaryDark: '#C62828',
      primaryBg: '#FFEBEE',
      primaryGradient: 'linear-gradient(135deg, #E53935 0%, #EF5350 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #E53935 0%, #EF6C6B 50%, #F5A3A2 100%)',
      price: '#E53935',
      priceDark: '#C62828',
      sale: '#FF6D00',
      error: '#D32F2F',
      success: '#43A047',
      successLight: '#E8F5E9',
      warning: '#F9A825',
      warningLight: '#FFF8E1',
      info: '#1976D2',
      textLink: '#E53935',
    },
  },
  yellow: {
    name: 'yellow',
    label: 'Warm Gold',
    colors: {
      primary: '#FFB300',
      primaryLight: '#FFC233',
      primaryDark: '#E6A100',
      primaryBg: '#FFF8E1',
      primaryGradient: 'linear-gradient(135deg, #FFB300 0%, #FFC233 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #FFB300 0%, #FFCF56 50%, #FFE088 100%)',
      price: '#E65100',
      priceDark: '#BF4400',
      sale: '#E65100',
      error: '#D32F2F',
      success: '#2E7D32',
      successLight: '#E8F5E9',
      warning: '#FFB300',
      warningLight: '#FFF8E1',
      info: '#0277BD',
      textLink: '#E6A100',
    },
  },
  green: {
    name: 'green',
    label: 'Fresh Green',
    colors: {
      primary: '#07C160',
      primaryLight: '#2BD17A',
      primaryDark: '#06A853',
      primaryBg: '#E8F8EF',
      primaryGradient: 'linear-gradient(135deg, #07C160 0%, #2BD17A 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #07C160 0%, #4DDB8D 50%, #99EBB9 100%)',
      price: '#E53935',
      priceDark: '#C62828',
      sale: '#E53935',
      error: '#E53935',
      success: '#07C160',
      successLight: '#E8F8EF',
      warning: '#FF9800',
      warningLight: '#FFF3E0',
      info: '#0288D1',
      textLink: '#07C160',
    },
  },
  monochrome: {
    name: 'monochrome',
    label: 'Monochrome',
    colors: {
      primary: '#1A1A1A',
      primaryLight: '#333333',
      primaryDark: '#000000',
      primaryBg: '#F5F5F5',
      primaryGradient: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #1A1A1A 0%, #4D4D4D 50%, #808080 100%)',
      price: '#1A1A1A',
      priceDark: '#000000',
      sale: '#666666',
      error: '#F44336',
      success: '#4CAF50',
      successLight: '#E8F5E9',
      warning: '#FF9800',
      warningLight: '#FFF3E0',
      info: '#2196F3',
      textLink: '#1A1A1A',
    },
  },
  dark: {
    name: 'dark',
    label: 'Dark Mode',
    colors: {
      primary: '#FF6A1F',
      primaryLight: '#FF8C4D',
      primaryDark: '#E64800',
      primaryBg: '#2A1500',
      primaryGradient: 'linear-gradient(135deg, #FF6A1F 0%, #FF8C4D 100%)',
      primaryGradientHeader: 'linear-gradient(180deg, #FF6A1F 0%, #FF8C4D 50%, #FFB088 100%)',
      price: '#FF6B6B',
      priceDark: '#E55A5A',
      sale: '#FF6B6B',
      error: '#FF6B6B',
      success: '#2DD4A8',
      successLight: '#0A2E23',
      warning: '#FFB347',
      warningLight: '#2E1F00',
      info: '#4DA6FF',
      textLink: '#FF6A1F',
    },
  },
};

export const THEME_PRESET_NAMES: ThemePreset[] = [
  'default',
  'teal',
  'red',
  'yellow',
  'green',
  'monochrome',
  'dark',
];
