import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopAddressCard } from './DesktopAddressCard';

const defaultAddress = {
  id: '1',
  name: 'John Doe',
  phone: '+998 90 123 45 67',
  street: '123 Main Street, Apt 4B',
  city: 'Tashkent',
  region: 'Uzbekistan',
  postalCode: '100000',
};

describe('DesktopAddressCard', () => {
  it('renders name and phone', () => {
    render(<DesktopAddressCard address={defaultAddress} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('+998 90 123 45 67')).toBeInTheDocument();
  });

  it('renders street address', () => {
    render(<DesktopAddressCard address={defaultAddress} />);
    expect(screen.getByText('123 Main Street, Apt 4B')).toBeInTheDocument();
  });

  it('renders city and region', () => {
    render(<DesktopAddressCard address={defaultAddress} />);
    expect(screen.getByText(/Tashkent, Uzbekistan/)).toBeInTheDocument();
  });

  it('calls onSelect when radio is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopAddressCard address={defaultAddress} onSelect={onSelect} />);
    await user.click(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('shows selected state', () => {
    render(<DesktopAddressCard address={defaultAddress} selected />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onEdit when Edit is clicked', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    render(<DesktopAddressCard address={defaultAddress} onEdit={onEdit} />);
    await user.click(screen.getByLabelText('Edit address: John Doe'));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('calls onDelete when Delete is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DesktopAddressCard address={defaultAddress} onDelete={onDelete} />);
    await user.click(screen.getByLabelText('Delete address: John Doe'));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('shows label badge when address has label', () => {
    render(<DesktopAddressCard address={{ ...defaultAddress, label: 'Home' }} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows Default badge when address is default', () => {
    render(<DesktopAddressCard address={{ ...defaultAddress, isDefault: true }} />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('hides radio when selectable is false', () => {
    render(<DesktopAddressCard address={defaultAddress} selectable={false} />);
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('hides Edit button when editable is false', () => {
    render(<DesktopAddressCard address={defaultAddress} editable={false} />);
    expect(screen.queryByLabelText('Edit address: John Doe')).not.toBeInTheDocument();
  });

  it('hides Delete button when deletable is false', () => {
    render(<DesktopAddressCard address={defaultAddress} deletable={false} />);
    expect(screen.queryByLabelText('Delete address: John Doe')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopAddressCard address={defaultAddress} className="my-address" />,
    );
    expect(container.firstElementChild?.className).toContain('my-address');
  });

  it('handles keyboard selection on radio', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopAddressCard address={defaultAddress} onSelect={onSelect} />);
    const radio = screen.getByRole('radio');
    radio.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
