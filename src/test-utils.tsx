import { render, type RenderOptions } from '@testing-library/react';
import { createElement } from 'react';
import { GeekShopProvider } from './i18n/GeekShopProvider';

/**
 * Custom render that wraps the component in GeekShopProvider
 * with English locale. Use this for Desktop components whose
 * tests assert against English aria-label strings.
 */
function renderWithProvider(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) =>
      createElement(
        GeekShopProvider,
        { locale: 'en', currency: 'UZS', platform: 'desktop' },
        children
      ),
    ...options,
  });
}

export { renderWithProvider };
export { screen, fireEvent, within, waitFor, act } from '@testing-library/react';
