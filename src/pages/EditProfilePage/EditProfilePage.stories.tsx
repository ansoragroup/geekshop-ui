import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditProfilePage } from './EditProfilePage';

const meta = {
  title: 'Pages/EditProfilePage',
  component: EditProfilePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof EditProfilePage>;

export default meta;
type Story = StoryObj<typeof EditProfilePage>;

/** Default: pre-filled profile form (Jasur Karimov) with avatar and all fields */
export const Default: Story = {
  args: {
    empty: false,
    showErrors: false,
    showAvatarSheet: false,
  },
};

/** Empty form for new user — blank fields, no avatar */
export const Empty: Story = {
  args: {
    empty: true,
  },
};

/** Form with validation errors displayed on all required fields */
export const WithErrors: Story = {
  args: {
    empty: true,
    showErrors: true,
  },
};

/** Avatar change bottom sheet open — take photo, choose from gallery, remove options */
export const AvatarSheet: Story = {
  args: {
    empty: false,
    showAvatarSheet: true,
  },
};

/** Filled profile ready to save — all fields populated with gender selector */
export const FilledProfile: Story = {
  name: 'Filled Profile',
  args: {
    empty: false,
    showErrors: false,
    showAvatarSheet: false,
  },
};
