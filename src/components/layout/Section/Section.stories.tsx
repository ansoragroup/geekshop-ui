import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
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
};

export default meta;
type Story = StoryObj<typeof Section>;

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
  name: 'Multiple Sections',
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
