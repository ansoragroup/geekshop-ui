import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { CascadePicker } from './CascadePicker';
import type { CascadeOption } from './CascadePicker';

const uzbekistanAddresses: CascadeOption[] = [
  {
    value: 'tashkent-city',
    label: 'Toshkent shahri',
    children: [
      {
        value: 'chilonzor',
        label: 'Chilonzor tumani',
        children: [
          { value: 'chilonzor-5', label: '5-mavze' },
          { value: 'chilonzor-7', label: '7-mavze' },
          { value: 'chilonzor-12', label: '12-mavze' },
          { value: 'chilonzor-15', label: '15-mavze' },
          { value: 'chilonzor-19', label: '19-mavze' },
        ],
      },
      {
        value: 'yunusobod',
        label: 'Yunusobod tumani',
        children: [
          { value: 'yunusobod-1', label: '1-mavze' },
          { value: 'yunusobod-5', label: '5-mavze' },
          { value: 'yunusobod-11', label: '11-mavze' },
          { value: 'yunusobod-17', label: '17-mavze' },
        ],
      },
      {
        value: 'mirzo-ulugbek',
        label: 'Mirzo Ulug\'bek tumani',
        children: [
          { value: 'mirzo-3', label: '3-mavze' },
          { value: 'mirzo-7', label: '7-mavze' },
          { value: 'mirzo-10', label: '10-mavze' },
        ],
      },
      {
        value: 'sergeli',
        label: 'Sergeli tumani',
        children: [
          { value: 'sergeli-1', label: '1-mavze' },
          { value: 'sergeli-5', label: '5-mavze' },
          { value: 'sergeli-8', label: '8-mavze' },
        ],
      },
      {
        value: 'olmazor',
        label: 'Olmazor tumani',
        children: [
          { value: 'olmazor-2', label: '2-mavze' },
          { value: 'olmazor-6', label: '6-mavze' },
        ],
      },
    ],
  },
  {
    value: 'tashkent-region',
    label: 'Toshkent viloyati',
    children: [
      {
        value: 'chirchiq',
        label: 'Chirchiq shahri',
        children: [
          { value: 'chirchiq-center', label: 'Markaz' },
          { value: 'chirchiq-north', label: 'Shimoliy' },
        ],
      },
      {
        value: 'olmaliq',
        label: 'Olmaliq shahri',
        children: [
          { value: 'olmaliq-center', label: 'Markaz' },
        ],
      },
      {
        value: 'nurafshon',
        label: 'Nurafshon shahri',
        children: [
          { value: 'nurafshon-1', label: '1-mavze' },
          { value: 'nurafshon-3', label: '3-mavze' },
        ],
      },
    ],
  },
  {
    value: 'samarqand',
    label: 'Samarqand viloyati',
    children: [
      {
        value: 'samarqand-city',
        label: 'Samarqand shahri',
        children: [
          { value: 'registon', label: 'Registon MFY' },
          { value: 'siab', label: 'Siab MFY' },
          { value: 'bogishamol', label: 'Bog\'ishamol MFY' },
        ],
      },
      {
        value: 'urgut',
        label: 'Urgut tumani',
        children: [
          { value: 'urgut-center', label: 'Markaz' },
          { value: 'urgut-north', label: 'Shimoliy' },
        ],
      },
      {
        value: 'kattaqorgon',
        label: 'Kattaqo\'rg\'on tumani',
        children: [
          { value: 'kattaqorgon-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'bukhoro',
    label: 'Buxoro viloyati',
    children: [
      {
        value: 'bukhoro-city',
        label: 'Buxoro shahri',
        children: [
          { value: 'bukhoro-center', label: 'Markaz MFY' },
          { value: 'bukhoro-ark', label: 'Ark MFY' },
        ],
      },
      {
        value: 'kogon',
        label: 'Kogon tumani',
        children: [
          { value: 'kogon-center', label: 'Markaz' },
        ],
      },
      {
        value: 'gijduvon',
        label: 'G\'ijduvon tumani',
        children: [
          { value: 'gijduvon-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'fargona',
    label: 'Farg\'ona viloyati',
    children: [
      {
        value: 'fargona-city',
        label: 'Farg\'ona shahri',
        children: [
          { value: 'fargona-center', label: 'Markaz MFY' },
          { value: 'fargona-south', label: 'Janubiy MFY' },
        ],
      },
      {
        value: 'qoqon',
        label: 'Qo\'qon shahri',
        children: [
          { value: 'qoqon-center', label: 'Markaz' },
          { value: 'qoqon-east', label: 'Sharqiy' },
        ],
      },
      {
        value: 'margilan',
        label: 'Marg\'ilon shahri',
        children: [
          { value: 'margilan-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'andijon',
    label: 'Andijon viloyati',
    children: [
      {
        value: 'andijon-city',
        label: 'Andijon shahri',
        children: [
          { value: 'andijon-center', label: 'Markaz MFY' },
          { value: 'andijon-bogishamol', label: 'Bog\'ishamol MFY' },
        ],
      },
      {
        value: 'asaka',
        label: 'Asaka tumani',
        children: [
          { value: 'asaka-center', label: 'Markaz' },
        ],
      },
      {
        value: 'xonobod',
        label: 'Xonobod shahri',
        children: [
          { value: 'xonobod-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'namangan',
    label: 'Namangan viloyati',
    children: [
      {
        value: 'namangan-city',
        label: 'Namangan shahri',
        children: [
          { value: 'namangan-center', label: 'Markaz MFY' },
          { value: 'namangan-navoi', label: 'Navoiy MFY' },
        ],
      },
      {
        value: 'chust',
        label: 'Chust tumani',
        children: [
          { value: 'chust-center', label: 'Markaz' },
        ],
      },
      {
        value: 'pop',
        label: 'Pop tumani',
        children: [
          { value: 'pop-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'xorazm',
    label: 'Xorazm viloyati',
    children: [
      {
        value: 'urganch',
        label: 'Urganch shahri',
        children: [
          { value: 'urganch-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'xiva',
        label: 'Xiva shahri',
        children: [
          { value: 'xiva-old', label: 'Ichan Qal\'a' },
          { value: 'xiva-new', label: 'Yangi shahar' },
        ],
      },
    ],
  },
  {
    value: 'qashqadaryo',
    label: 'Qashqadaryo viloyati',
    children: [
      {
        value: 'qarshi',
        label: 'Qarshi shahri',
        children: [
          { value: 'qarshi-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'shahrisabz',
        label: 'Shahrisabz shahri',
        children: [
          { value: 'shahrisabz-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'surxondaryo',
    label: 'Surxondaryo viloyati',
    children: [
      {
        value: 'termiz',
        label: 'Termiz shahri',
        children: [
          { value: 'termiz-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'denov',
        label: 'Denov tumani',
        children: [
          { value: 'denov-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'navoiy',
    label: 'Navoiy viloyati',
    children: [
      {
        value: 'navoiy-city',
        label: 'Navoiy shahri',
        children: [
          { value: 'navoiy-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'zarafshon',
        label: 'Zarafshon shahri',
        children: [
          { value: 'zarafshon-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'jizzax',
    label: 'Jizzax viloyati',
    children: [
      {
        value: 'jizzax-city',
        label: 'Jizzax shahri',
        children: [
          { value: 'jizzax-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'zomin',
        label: 'Zomin tumani',
        children: [
          { value: 'zomin-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'sirdaryo',
    label: 'Sirdaryo viloyati',
    children: [
      {
        value: 'guliston',
        label: 'Guliston shahri',
        children: [
          { value: 'guliston-center', label: 'Markaz MFY' },
        ],
      },
      {
        value: 'sirdaryo-city',
        label: 'Sirdaryo shahri',
        children: [
          { value: 'sirdaryo-center', label: 'Markaz' },
        ],
      },
    ],
  },
  {
    value: 'karakalpakstan',
    label: 'Qoraqalpog\'iston Respublikasi',
    children: [
      {
        value: 'nukus',
        label: 'Nukus shahri',
        children: [
          { value: 'nukus-center', label: 'Markaz MFY' },
          { value: 'nukus-south', label: 'Janubiy MFY' },
        ],
      },
      {
        value: 'moynoq',
        label: 'Mo\'ynoq tumani',
        children: [
          { value: 'moynoq-center', label: 'Markaz' },
        ],
      },
    ],
  },
];

const meta = {
  title: 'Form/CascadePicker',
  component: CascadePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CascadePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: uzbekistanAddresses,
    label: 'Manzil',
    placeholder: 'Viloyat / Tuman / Mahalla',
    title: 'Manzilni tanlang',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /manzil/i });

    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const WithValue: Story = {
  args: {
    options: uzbekistanAddresses,
    label: 'Manzil',
    value: ['tashkent-city', 'chilonzor', 'chilonzor-5'],
  },
};

export const WithError: Story = {
  args: {
    options: uzbekistanAddresses,
    label: 'Yetkazib berish manzili',
    error: 'Iltimos, to\'liq manzilni tanlang',
    placeholder: 'Viloyat / Tuman / Mahalla',
  },
};

export const Disabled: Story = {
  args: {
    options: uzbekistanAddresses,
    label: 'Manzil',
    disabled: true,
    value: ['samarqand', 'samarqand-city', 'registon'],
  },
};

export const TwoLevels: Story = {
  name: '2-Level Picker (City/District)',
  args: {
    options: uzbekistanAddresses,
    label: 'Shahar va tuman',
    level: 2,
    placeholder: 'Viloyat / Tuman',
    title: 'Shahar va tumanni tanlang',
    onChange: fn(),
  },
};

export const Interactive: Story = {
  name: 'Controlled Cascade',
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CascadePicker
          options={uzbekistanAddresses}
          label="Yetkazib berish manzili"
          value={value}
          onChange={(v, l) => {
            setValue(v);
            setLabels(l);
          }}
          placeholder="Viloyat / Tuman / Mahalla"
          title="Manzilni tanlang"
        />
        {labels.length > 0 && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Tanlangan: {labels.join(' > ')}
          </div>
        )}
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      {
        value: 'tashkent',
        label: 'Toshkent shahri',
        children: [
          {
            value: 'chilonzor',
            label: 'Chilonzor',
            children: [
              { value: 'm5', label: '5-mavze' },
              { value: 'm7', label: '7-mavze', disabled: true },
            ],
          },
          {
            value: 'sergeli',
            label: 'Sergeli',
            disabled: true,
            children: [
              { value: 's1', label: '1-mavze' },
            ],
          },
        ],
      },
    ],
    label: 'Manzil',
    placeholder: 'Tanlang',
  },
};
