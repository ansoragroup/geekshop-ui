import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 375, background: '#F5F5F5', padding: 12, minHeight: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <p style={{ fontSize: 14, color: '#666' }}>Oddiy kontent bo'limi</p>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Mahsulot haqida',
    children: (
      <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
        <p>NVIDIA GeForce RTX 4060 Ti - o'yin va professional ishlar uchun yuqori samarali videokarata.</p>
        <p style={{ marginTop: 8 }}>8GB GDDR6X xotira, Ray Tracing, DLSS 3 texnologiyalari.</p>
      </div>
    ),
  },
};

export const CustomPadding: Story = {
  args: {
    title: 'Chegirmalar',
    padding: '16px 20px',
    children: (
      <div style={{ fontSize: 14, color: '#FF0000', fontWeight: 600 }}>
        30% gacha chegirma!
      </div>
    ),
  },
};

export const MultipleSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section title="Tavsif">
        <p style={{ fontSize: 14, color: '#666' }}>Mahsulot tavsifi shu yerda.</p>
      </Section>
      <Section title="Xususiyatlar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Brend', 'NVIDIA'],
            ['Model', 'RTX 4060 Ti'],
            ['Xotira', '8GB GDDR6X'],
            ['TDP', '160W'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#999' }}>{label}</span>
              <span style={{ color: '#1A1A1A' }}>{value}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Sharhlar (24)">
        <p style={{ fontSize: 14, color: '#666' }}>Mijozlar sharhlari shu yerda ko'rinadi.</p>
      </Section>
    </div>
  ),
};

export const NoTitle: Story = {
  name: 'Without Title',
  args: {
    children: (
      <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
        <p>Bu bo'limda sarlavha yo'q. Faqat kontent ko'rinadi.</p>
        <p style={{ marginTop: 8 }}>Masalan, mahsulot tavsifi yoki qo'shimcha ma'lumot.</p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  name: 'Large Padding (24px 32px)',
  args: {
    title: 'Keng bo\'lim',
    padding: '24px 32px',
    children: (
      <p style={{ fontSize: 14, color: '#666' }}>Bu bo'limda ko'proq ichki bo'shliq bor.</p>
    ),
  },
};

export const ZeroPadding: Story = {
  name: 'Edge: Zero Padding',
  args: {
    title: 'Rasm galereyasi',
    padding: '0',
    children: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ aspectRatio: '1', background: `hsl(${i * 60}, 50%, 85%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#666' }}>
            Rasm {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const LongTitle: Story = {
  name: 'Edge: Very Long Title',
  args: {
    title: 'NVIDIA GeForce RTX 4090 Super — xususiyatlari va texnik parametrlari',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['GPU', 'AD102-300'],
          ['CUDA yadrolari', '16384'],
          ['Soat chastotasi', '2.52 GHz'],
          ['Xotira', '24GB GDDR6X'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>{label}</span>
            <span style={{ color: '#1A1A1A' }}>{value}</span>
          </div>
        ))}
      </div>
    ),
  },
};

export const NestedSections: Story = {
  render: () => (
    <Section title="Mahsulot ma'lumotlari">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Section title="Umumiy" padding="8px 0">
          <p style={{ fontSize: 14, color: '#666' }}>Brend: Lenovo, Model: ThinkPad X1 Carbon</p>
        </Section>
        <Section title="Protsessor" padding="8px 0">
          <p style={{ fontSize: 14, color: '#666' }}>Intel Core i7-1365U, 10 yadro, 4.9 GHz gacha</p>
        </Section>
        <Section title="Xotira" padding="8px 0">
          <p style={{ fontSize: 14, color: '#666' }}>32GB LPDDR5, 512GB NVMe SSD</p>
        </Section>
      </div>
    </Section>
  ),
};

export const RichContent: Story = {
  name: 'Rich Content (Product Detail)',
  args: {
    title: 'Tavsif',
    children: (
      <div style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 12 }}>
          <strong style={{ color: '#1A1A1A' }}>Samsung Galaxy S24 Ultra</strong> — eng ilg'or smartfon.
          Titanium korpus, 200MP kamera, va yangi Galaxy AI sun'iy intellekt funksiyalari bilan jihozlangan.
        </p>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li>6.8" Dynamic AMOLED 2X ekran, 120Hz</li>
          <li>Snapdragon 8 Gen 3 protsessor</li>
          <li>12GB RAM, 256GB/512GB/1TB xotira</li>
          <li>5000mAh batareya, 45W tez zaryadlash</li>
          <li>IP68 suv va changdan himoya</li>
        </ul>
        <p style={{ color: '#07C160', fontWeight: 600, marginTop: 12 }}>
          Kafolat: 12 oy | Bepul yetkazib berish
        </p>
      </div>
    ),
  },
};

export const EmptySection: Story = {
  name: 'Edge: Empty Children',
  args: {
    title: 'Sharhlar',
    children: (
      <div style={{ padding: '24px 0', textAlign: 'center', color: '#999', fontSize: 14 }}>
        Hali sharhlar yo'q. Birinchi bo'ling!
      </div>
    ),
  },
};

export const WithCustomAriaLabel: Story = {
  name: 'Custom aria-label Override',
  args: {
    title: 'Texnik xususiyatlar',
    'aria-label': 'Product technical specifications section',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Vazni', '1.24 kg'],
          ['O\'lchami', '315 x 222 x 15.6 mm'],
          ['Rangi', 'Space Black'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#999' }}>{label}</span>
            <span style={{ color: '#1A1A1A' }}>{value}</span>
          </div>
        ))}
      </div>
    ),
  },
};
