import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductCard } from './DesktopProductCard';

const meta = {
  title: 'Product/DesktopProductCard',
  component: DesktopProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (AliExpress Style) ─────────────────────────────────────────────

export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Двойной шаблон молния бронзового цвета тянуть ретро подвеска',
    price: 9_149.85,
    originalPrice: 14_029.77,
    discount: '-35%',
    rating: 4.4,
    purchaseCount: 120,
    badges: [{ label: 'SALE', variant: 'sale' }],
    deliveryText: 'до 30 дней, бесплатно',
  },
};

// ─── With Image Swipe Preview ───────────────────────────────────────────────

export const ImageSwipePreview: Story = {
  name: 'Image Swipe Preview',
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
    ],
    title: 'Nike Air Max 90 кроссовки мужские различные расцветки',
    price: 1_290_000,
    originalPrice: 1_890_000,
    discount: '-32%',
    rating: 4.8,
    purchaseCount: 3420,
    badges: [
      { label: 'SALE', variant: 'sale' },
      { label: 'ТОП', variant: 'top' },
    ],
    deliveryText: 'до 30 дней, бесплатно',
  },
};

// ─── With Multiple Badges ───────────────────────────────────────────────────

export const MultipleBadges: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    title: 'Новая модная унисекс-кепка в стиле хип-хоп ретро с вышивкой',
    price: 91_071.01,
    originalPrice: 182_142.01,
    discount: '-50%',
    rating: 1.0,
    purchaseCount: 1,
    badges: [
      { label: 'SALE', variant: 'sale' },
      { label: 'ТОП', variant: 'top' },
    ],
    deliveryText: 'до 30 дней, бесплатно',
  },
};

// ─── With Recommended Label ─────────────────────────────────────────────────

export const Recommended: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    title: '1 шт., натуральный кристалл, черный турмалин, грубый камень',
    price: 49_092.96,
    originalPrice: 83_209.02,
    discount: '-41%',
    rating: 4.8,
    purchaseCount: 26,
    badges: [{ label: 'SALE', variant: 'sale' }],
    recommended: true,
    deliveryText: 'до 30 дней, бесплатно',
  },
};

// ─── Paid Delivery ──────────────────────────────────────────────────────────

export const PaidDelivery: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    title: 'POP MART SKULLPANDA x My Little Pony Series Фигурки-сюрпризы',
    price: 364_568.62,
    originalPrice: 868_020.53,
    discount: '-58%',
    rating: 4.8,
    purchaseCount: 21,
    deliveryText: 'до 30 дней, от 52 152.38 UZS',
  },
};

// ─── High Purchase Count ────────────────────────────────────────────────────

export const HighPurchaseCount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    title: 'Шармы цветы 30 шт. eunwol акриловые бусины для браслета',
    price: 19_031.69,
    originalPrice: 27_937.54,
    discount: '-32%',
    rating: 4.8,
    purchaseCount: 5883,
    badges: [
      { label: 'SALE', variant: 'sale' },
      { label: 'ТОП', variant: 'top' },
    ],
    recommended: true,
    recommendedText: 'Рекомендуем',
    deliveryText: 'до 30 дней, бесплатно',
  },
};

// ─── No Discount ────────────────────────────────────────────────────────────

export const NoDiscount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    title: '10 шт. Металлические шпульки для швейных машин Singer',
    price: 29_157.52,
    rating: 4.5,
    purchaseCount: 1,
    freeShipping: true,
  },
};

// ─── Grid (6 cards) ─────────────────────────────────────────────────────────

export const Grid: Story = {
  name: 'Grid (6 cards)',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 200px)',
          gap: 1,
          width: 1280,
        }}
      >
        <Story />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
          title="Детские свитера LILIGIRL тёплые зимние для мальчиков"
          price={87_472.55}
          originalPrice={213_496.47}
          discount="-59%"
          rating={5.0}
          purchaseCount={144}
          deliveryText="до 30 дней, от 94 914.43 UZS"
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
          title="Слайдер защитный для мотоцикла DUCATI діверсійного спорта"
          price={723_569.82}
          originalPrice={1_447_139.64}
          discount="-50%"
          rating={4.8}
          purchaseCount={1}
          badges={[{ label: 'SALE', variant: 'sale' }]}
          deliveryText="до 30 дней, бесплатно"
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop"
          title="Конвертер DisplayPort в VGA адаптер для монитора"
          price={16_469.73}
          originalPrice={32_329.47}
          discount="-49%"
          rating={4.9}
          purchaseCount={807}
          recommended
          deliveryText="до 30 дней, от 7 563.88 UZS"
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
          title="RtopR Детские полотенца с капюшоном 2 шт комплект"
          price={152_259.34}
          originalPrice={507_507.41}
          discount="-70%"
          rating={5.0}
          purchaseCount={2}
          badges={[{ label: 'SALE', variant: 'sale' }]}
          deliveryText="до 30 дней, от..."
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
          title="Автомобильный Мягкий Коврик Для Подлокотника С карманом"
          price={168_516.94}
          originalPrice={337_033.87}
          discount="-50%"
          rating={1.0}
          purchaseCount={1}
          badges={[
            { label: 'SALE', variant: 'sale' },
            { label: 'ТОП', variant: 'top' },
          ]}
          deliveryText="до 30 дней, бесплатно"
        />
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};

// ─── Legacy Badges (backward compat) ────────────────────────────────────────

export const LegacyBadges: Story = {
  name: 'Legacy Badge Format',
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Samsung Galaxy S24 Ultra 12/256GB Titanium Gray',
    price: 15_990_000,
    originalPrice: 18_990_000,
    discount: '-16%',
    rating: 4.8,
    purchaseCount: 12453,
    badges: [
      { label: 'ORIGINAL', color: 'green' },
      { label: 'TOP', color: 'red' },
    ],
    freeShipping: true,
  },
};
