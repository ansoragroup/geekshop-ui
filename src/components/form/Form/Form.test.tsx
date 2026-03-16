import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useRef, useState } from 'react';
import { Form, FormItem, useFormContext } from './Form';
import type { FormHandle, ValidationRule } from './Form';
import { Input } from '../Input';

// Helper to render a form with controlled input + FormItem
function TestForm({
  onSubmit,
  onError,
  initialValues,
  rules,
  required,
  helpText,
}: {
  onSubmit?: (values: Record<string, unknown>) => void;
  onError?: (errors: Record<string, string>) => void;
  initialValues?: Record<string, unknown>;
  rules?: ValidationRule[];
  required?: boolean;
  helpText?: string;
}) {
  const [email, setEmail] = useState('');
  const formRef = useRef<FormHandle>(null);

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      onError={onError}
      initialValues={initialValues ?? { email: '' }}
    >
      <FormItem
        name="email"
        label="Email"
        required={required}
        rules={rules}
        helpText={helpText}
      >
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            formRef.current?.setFieldValue('email', v);
          }}
        />
      </FormItem>
      <button type="submit" data-testid="submit-btn">Submit</button>
    </Form>
  );
}

describe('Form', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a form element', () => {
    const { container } = render(
      <Form>
        <div>child</div>
      </Form>,
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders children inside the form', () => {
    render(
      <Form>
        <span data-testid="child">Hello</span>
      </Form>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('has noValidate attribute on the form', () => {
    const { container } = render(
      <Form>
        <div>child</div>
      </Form>,
    );
    expect(container.querySelector('form')).toHaveAttribute('novalidate');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Form className="my-form">
        <div>child</div>
      </Form>,
    );
    expect(container.querySelector('form')).toHaveClass('my-form');
  });

  it('spreads rest props onto the form element', () => {
    const { container } = render(
      <Form data-testid="my-form">
        <div>child</div>
      </Form>,
    );
    expect(container.querySelector('form')).toHaveAttribute('data-testid', 'my-form');
  });

  it('calls onSubmit with values when form is valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TestForm onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'test@example.com');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' }),
    );
  });

  it('calls onError when required validation fails', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(<TestForm onError={onError} required />);

    // Submit without entering anything
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
    const errors = onError.mock.calls[0][0];
    expect(errors).toHaveProperty('email');
  });

  it('shows error message in FormItem when validation fails', async () => {
    const user = userEvent.setup();

    render(
      <TestForm
        required
        rules={[
          { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
        ]}
      />,
    );

    // Submit empty form
    await user.click(screen.getByTestId('submit-btn'));

    // Should show error alert
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe('FormItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a label', () => {
    render(
      <Form>
        <FormItem name="test" label="Test Label">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required asterisk when required is true', () => {
    render(
      <Form>
        <FormItem name="test" label="Name" required>
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when required is false', () => {
    render(
      <Form>
        <FormItem name="test" label="Name">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('shows helpText when no error', () => {
    render(
      <Form>
        <FormItem name="test" label="Name" helpText="Enter your full name">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('shows manual error override', () => {
    render(
      <Form>
        <FormItem name="test" label="Name" error="Server error">
          <input />
        </FormItem>
      </Form>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Server error');
  });

  it('hides helpText when error is shown', () => {
    render(
      <Form>
        <FormItem name="test" label="Name" error="Error!" helpText="Help text">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.queryByText('Help text')).not.toBeInTheDocument();
  });

  it('applies horizontal layout with labelPosition=left', () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Name" labelPosition="left">
          <input />
        </FormItem>
      </Form>,
    );
    // The FormItem root should have the horizontal class
    const formItem = container.querySelector('[class*="formItem"]');
    expect(formItem?.className).toContain('horizontal');
  });

  it('applies custom className to FormItem', () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Name" className="custom-item">
          <input />
        </FormItem>
      </Form>,
    );
    const formItem = container.querySelector('[class*="formItem"]');
    expect(formItem?.className).toContain('custom-item');
  });
});

describe('Validation rules', () => {
  afterEach(() => {
    cleanup();
  });

  it('validates required fields', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(<TestForm onError={onError} required />);
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('validates minLength rule', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onError={onError}
        rules={[{ type: 'minLength', value: 5, message: 'Too short' }]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'ab');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('validates maxLength rule', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onError={onError}
        rules={[{ type: 'maxLength', value: 3, message: 'Too long' }]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'abcdef');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('validates pattern rule', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onError={onError}
        rules={[
          { type: 'pattern', value: /^[a-z]+$/, message: 'Only lowercase letters' },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'ABC123');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('validates custom rule returning false', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onError={onError}
        rules={[
          {
            type: 'custom',
            message: 'Must contain number',
            validator: (val) => typeof val === 'string' && /\d/.test(val),
          },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'noNumbers');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('validates custom rule returning string', async () => {
    const onError = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onError={onError}
        rules={[
          {
            type: 'custom',
            message: '',
            validator: (val) => {
              if (val === 'bad') return 'Cannot be "bad"';
              return true;
            },
          },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'bad');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onError).toHaveBeenCalled();
  });

  it('passes validation when all rules satisfied', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <TestForm
        onSubmit={onSubmit}
        required
        rules={[
          { type: 'minLength', value: 3, message: 'Too short' },
          { type: 'pattern', value: /^[a-z@.]+$/, message: 'Invalid' },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText('Enter email');
    await user.type(input, 'test@example.com');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onSubmit).toHaveBeenCalled();
  });
});

describe('Form imperative handle', () => {
  afterEach(() => {
    cleanup();
  });

  it('reset clears form values', async () => {
    const onSubmit = vi.fn();

    function TestWithReset() {
      const formRef = useRef<FormHandle>(null);
      const [email, setEmail] = useState('initial@test.com');

      return (
        <div>
          <Form ref={formRef} onSubmit={onSubmit} initialValues={{ email: '' }}>
            <FormItem name="email" label="Email">
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  formRef.current?.setFieldValue('email', v);
                }}
              />
            </FormItem>
          </Form>
          <button
            data-testid="reset-btn"
            onClick={() => {
              formRef.current?.reset();
              setEmail('');
            }}
          >
            Reset
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<TestWithReset />);

    // Click reset
    await user.click(screen.getByTestId('reset-btn'));
    // Input should be cleared
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue('');
  });
});

describe('useFormContext', () => {
  afterEach(() => {
    cleanup();
  });

  function ContextConsumer() {
    const ctx = useFormContext();
    return (
      <div
        data-testid="consumer"
        data-has-context={ctx !== null ? 'true' : 'false'}
        data-has-register={ctx?.registerField ? 'true' : 'false'}
        data-has-set-value={ctx?.setFieldValue ? 'true' : 'false'}
        data-has-get-error={ctx?.getFieldError ? 'true' : 'false'}
      >
        consumer
      </div>
    );
  }

  it('returns null outside of Form', () => {
    render(<ContextConsumer />);
    const el = screen.getByTestId('consumer');
    expect(el).toHaveAttribute('data-has-context', 'false');
  });

  it('returns context value inside Form', () => {
    render(
      <Form>
        <ContextConsumer />
      </Form>,
    );
    const el = screen.getByTestId('consumer');
    expect(el).toHaveAttribute('data-has-context', 'true');
    expect(el).toHaveAttribute('data-has-register', 'true');
    expect(el).toHaveAttribute('data-has-set-value', 'true');
    expect(el).toHaveAttribute('data-has-get-error', 'true');
  });
});
