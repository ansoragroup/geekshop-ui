import type { Preview } from '@storybook/react-vite'
import '../src/theme/global.scss'

const preview: Preview = {
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
      },
      defaultViewport: 'iPhone13',
    },
    backgrounds: {
      default: 'GeekShop Light',
      values: [
        { name: 'GeekShop Light', value: '#F5F5F5' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'GeekShop Primary', value: '#FF5000' },
      ],
    },
    layout: 'centered',
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
