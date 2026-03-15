import type { Preview } from '@storybook/react-vite'
import { createElement } from 'react'
import { GeekShopProvider } from '../src/i18n'
import { setThemePreset } from '../src/theme'
import type { ThemePreset } from '../src/theme/presets'
import '../src/theme/global.scss'

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'uz', title: "O'zbek" },
          { value: 'ru', title: 'Русский' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
    currency: {
      name: 'Currency',
      description: 'Display currency',
      toolbar: {
        icon: 'credit',
        items: [
          { value: 'UZS', title: "UZS (so'm)" },
          { value: 'USD', title: 'USD ($)' },
          { value: 'RUB', title: 'RUB (₽)' },
          { value: 'EUR', title: 'EUR (€)' },
        ],
        dynamicTitle: true,
      },
    },
    themePreset: {
      name: 'Theme Preset',
      description: 'Color theme preset',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Orange (Default)' },
          { value: 'teal', title: 'Teal Tech' },
          { value: 'red', title: 'Classic Red' },
          { value: 'yellow', title: 'Warm Gold' },
          { value: 'green', title: 'Fresh Green' },
          { value: 'monochrome', title: 'Monochrome' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'uz',
    currency: 'UZS',
    themePreset: 'default',
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale || 'uz';
      const currency = context.globals.currency || 'UZS';
      const preset = (context.globals.themePreset || 'default') as ThemePreset;

      setThemePreset(preset);

      return createElement(
        GeekShopProvider,
        { locale, currency },
        createElement(Story),
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        iPhone13: {
          name: 'iPhone 13 / 14',
          styles: { width: '390px', height: '844px' },
        },
        iPhoneSE: {
          name: 'iPhone SE',
          styles: { width: '375px', height: '667px' },
        },
        iPhone14Pro: {
          name: 'iPhone 14 Pro',
          styles: { width: '393px', height: '852px' },
        },
        android: {
          name: 'Android Medium',
          styles: { width: '412px', height: '915px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
      defaultViewport: 'iPhone13',
    },
    backgrounds: {
      default: 'GeekShop Light',
      values: [
        { name: 'GeekShop Light', value: '#F5F5F5' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'GeekShop Primary', value: '#FF5000' },
        { name: 'Dark', value: '#1A1A1A' },
      ],
    },
    layout: 'centered',
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
