import { render, cleanup, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { ImageLazy } from './ImageLazy';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

let intersectionCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;

class MockIntersectionObserver {
  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
  constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
    intersectionCallback = callback;
  }
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function simulateInView() {
  act(() => {
    intersectionCallback([{ isIntersecting: true }]);
  });
}

describe('ImageLazy', () => {
  it('renders container div', () => {
    const { container } = render(<ImageLazy src="img.jpg" alt="test" />);
    expect(container.firstElementChild).toBeTruthy();
  });

  it('does not render img until in view', () => {
    const { container } = render(<ImageLazy src="img.jpg" alt="test" />);
    // No main img rendered yet (no placeholder either since none specified)
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(0);
  });

  it('renders img after entering viewport', () => {
    const { container } = render(<ImageLazy src="img.jpg" alt="test image" />);
    simulateInView();
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('alt')).toBe('test image');
    expect(img?.getAttribute('src')).toBe('img.jpg');
  });

  it('applies color placeholder as background', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" placeholder="#f0f0f0" />,
    );
    // Color placeholder is a div with backgroundColor
    const rootDiv = container.firstElementChild as HTMLElement;
    const divChildren = rootDiv.querySelectorAll(':scope > div');
    // Find the one with backgroundColor set
    const placeholderDiv = Array.from(divChildren).find(
      (el) => (el as HTMLElement).style.backgroundColor !== '',
    ) as HTMLElement | undefined;
    expect(placeholderDiv).toBeTruthy();
    expect(placeholderDiv!.style.backgroundColor).toBe('rgb(240, 240, 240)');
  });

  it('applies image placeholder', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" placeholder="thumb.jpg" />,
    );
    const placeholderImg = container.querySelector('img[aria-hidden="true"]');
    expect(placeholderImg).toBeInTheDocument();
    expect(placeholderImg?.getAttribute('src')).toBe('thumb.jpg');
  });

  it('applies rgb placeholder as color', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" placeholder="rgb(100,200,150)" />,
    );
    const rootDiv = container.firstElementChild as HTMLElement;
    const divChildren = rootDiv.querySelectorAll(':scope > div');
    const placeholderDiv = Array.from(divChildren).find(
      (el) => (el as HTMLElement).style.backgroundColor !== '',
    );
    expect(placeholderDiv).toBeTruthy();
  });

  it('applies aspectRatio style', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" aspectRatio="16/9" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.aspectRatio).toBe('16/9');
  });

  it('applies border radius', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" radius={8} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.borderRadius).toBe('8px');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" className="my-image" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-image');
  });

  it('applies objectFit style to img', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" objectFit="contain" />,
    );
    simulateInView();
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.style.objectFit).toBe('contain');
  });

  it('defaults objectFit to cover', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" />,
    );
    simulateInView();
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.style.objectFit).toBe('cover');
  });

  it('sets up IntersectionObserver on mount', () => {
    render(<ImageLazy src="img.jpg" alt="test" />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('has displayName', () => {
    expect(ImageLazy.displayName).toBe('ImageLazy');
  });

  it('applies custom style', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" style={{ margin: '10px' }} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.margin).toBe('10px');
  });

  it('sets width and height on img element', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" width={400} height={300} />,
    );
    simulateInView();
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('width')).toBe('400');
    expect(img.getAttribute('height')).toBe('300');
  });

  it('sets sizes attribute on img element', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" sizes="(max-width: 768px) 100vw, 50vw" />,
    );
    simulateInView();
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('sizes')).toBe('(max-width: 768px) 100vw, 50vw');
  });

  it('adds decoding="async" by default', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" />,
    );
    simulateInView();
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('decoding')).toBe('async');
  });

  it('renders immediately when priority is true', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="priority test" priority />,
    );
    // Should render img without needing simulateInView
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('alt')).toBe('priority test');
  });

  it('does not set loading="lazy" when priority is true', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" priority />,
    );
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBeNull();
  });

  it('sets fetchpriority="high" when priority is true', () => {
    const { container } = render(
      <ImageLazy src="img.jpg" alt="test" priority />,
    );
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it('does not set up IntersectionObserver when priority is true', () => {
    mockObserve.mockClear();
    render(<ImageLazy src="img.jpg" alt="test" priority />);
    expect(mockObserve).not.toHaveBeenCalled();
  });
});
