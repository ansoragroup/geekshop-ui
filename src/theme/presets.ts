export type ThemePreset = 'default' | 'teal' | 'red' | 'yellow' | 'green' | 'monochrome';

export interface ThemePresetConfig {
  name: ThemePreset;
  label: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryBg: string;
    primaryGradient: string;
    primaryGradientHeader: string;
  };
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
    },
  },
};

export const THEME_PRESET_NAMES: ThemePreset[] = ['default', 'teal', 'red', 'yellow', 'green', 'monochrome'];
