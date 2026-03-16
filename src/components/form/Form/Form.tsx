import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  useRef,
  useId,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import type { FormHTMLAttributes, ReactNode, HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './Form.module.scss';

// ---- Validation Rule Types ----

export type ValidationRuleType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';

export interface ValidationRule {
  /** Rule type */
  type: ValidationRuleType;
  /** Value for minLength/maxLength/pattern rules */
  value?: number | string | RegExp;
  /** Error message to display when validation fails */
  message: string;
  /** Custom validator function (for 'custom' type) */
  validator?: (value: unknown) => boolean | string;
}

// ---- Form Context ----

interface FieldRegistration {
  rules: ValidationRule[];
}

export interface FormContextValue {
  /** Register a field for validation */
  registerField: (name: string, rules: ValidationRule[]) => void;
  /** Unregister a field */
  unregisterField: (name: string) => void;
  /** Set a field value */
  setFieldValue: (name: string, value: unknown) => void;
  /** Get error for a specific field */
  getFieldError: (name: string) => string | undefined;
  /** Get all current values */
  getValues: () => Record<string, unknown>;
  /** Subscribe to error updates */
  subscribe: (listener: () => void) => () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

/** Hook to access form context from children (FormItem, etc.) */
export function useFormContext(): FormContextValue | null {
  return useContext(FormContext);
}

// ---- Form Ref Handle ----

export interface FormHandle {
  /** Validate all fields and submit if valid */
  submit: () => void;
  /** Reset all fields to initial values */
  reset: () => void;
  /** Validate all fields without submitting, returns errors */
  validate: () => Record<string, string>;
  /** Set a single field value */
  setFieldValue: (name: string, value: unknown) => void;
  /** Get all current values */
  getValues: () => Record<string, unknown>;
}

// ---- Validation Logic ----

function validateField(
  value: unknown,
  rules: ValidationRule[],
  t: (key: string) => string,
): string {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required': {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          return rule.message || t('form.required');
        }
        break;
      }
      case 'minLength': {
        const minLen = typeof rule.value === 'number' ? rule.value : 0;
        if (typeof value === 'string' && value.length < minLen) {
          return rule.message || t('form.minLength');
        }
        break;
      }
      case 'maxLength': {
        const maxLen = typeof rule.value === 'number' ? rule.value : Infinity;
        if (typeof value === 'string' && value.length > maxLen) {
          return rule.message || t('form.maxLength');
        }
        break;
      }
      case 'pattern': {
        const regex =
          rule.value instanceof RegExp
            ? rule.value
            : typeof rule.value === 'string'
              ? new RegExp(rule.value)
              : null;
        if (regex && typeof value === 'string' && !regex.test(value)) {
          return rule.message || t('form.pattern');
        }
        break;
      }
      case 'custom': {
        if (rule.validator) {
          const result = rule.validator(value);
          if (result === false) {
            return rule.message || t('form.invalid');
          }
          if (typeof result === 'string') {
            return result;
          }
        }
        break;
      }
    }
  }
  return '';
}

// ---- Form Props ----

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
  /** Called with form values when validation passes */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /** Called with errors when validation fails */
  onError?: (errors: Record<string, string>) => void;
  /** Initial values for form fields */
  initialValues?: Record<string, unknown>;
  /** Form content */
  children: ReactNode;
}

// ---- Form Component ----

export const Form = forwardRef<FormHandle, FormProps>(
  (
    {
      onSubmit,
      onError,
      initialValues = {},
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const valuesRef = useRef<Record<string, unknown>>({ ...initialValues });
    const fieldsRef = useRef<Record<string, FieldRegistration>>({});
    const errorsRef = useRef<Record<string, string>>({});
    const listenersRef = useRef<Set<() => void>>(new Set());

    // Force re-render subscribers (FormItems)
    const notifyListeners = useCallback(() => {
      listenersRef.current.forEach((listener) => listener());
    }, []);

    const subscribe = useCallback((listener: () => void) => {
      listenersRef.current.add(listener);
      return () => {
        listenersRef.current.delete(listener);
      };
    }, []);

    const registerField = useCallback(
      (name: string, rules: ValidationRule[]) => {
        fieldsRef.current[name] = { rules };
        if (!(name in valuesRef.current)) {
          valuesRef.current[name] = initialValues[name] ?? '';
        }
      },
      [initialValues],
    );

    const unregisterField = useCallback((name: string) => {
      delete fieldsRef.current[name];
      delete errorsRef.current[name];
    }, []);

    const setFieldValue = useCallback(
      (name: string, value: unknown) => {
        valuesRef.current[name] = value;
        // Clear error when value changes
        if (errorsRef.current[name]) {
          errorsRef.current[name] = '';
          notifyListeners();
        }
      },
      [notifyListeners],
    );

    const getFieldError = useCallback((name: string): string | undefined => {
      return errorsRef.current[name] || undefined;
    }, []);

    const validateAll = useCallback((): Record<string, string> => {
      const newErrors: Record<string, string> = {};
      for (const [name, registration] of Object.entries(fieldsRef.current)) {
        const value = valuesRef.current[name];
        const error = validateField(value, registration.rules, t);
        if (error) {
          newErrors[name] = error;
        }
      }
      errorsRef.current = newErrors;
      notifyListeners();
      return newErrors;
    }, [t, notifyListeners]);

    const handleSubmit = useCallback(
      (e?: React.FormEvent) => {
        e?.preventDefault();
        const errors = validateAll();
        if (Object.keys(errors).length > 0) {
          onError?.(errors);
        } else {
          onSubmit?.({ ...valuesRef.current });
        }
      },
      [validateAll, onSubmit, onError],
    );

    const handleReset = useCallback(() => {
      valuesRef.current = { ...initialValues };
      errorsRef.current = {};
      notifyListeners();
    }, [initialValues, notifyListeners]);

    // Expose imperative handle
    useImperativeHandle(
      ref,
      () => ({
        submit: () => handleSubmit(),
        reset: handleReset,
        validate: validateAll,
        setFieldValue,
        getValues: () => ({ ...valuesRef.current }),
      }),
      [handleSubmit, handleReset, validateAll, setFieldValue],
    );

    const getValuesFromRef = useCallback(() => ({ ...valuesRef.current }), []);

    const contextValue: FormContextValue = {
      registerField,
      unregisterField,
      setFieldValue,
      getFieldError,
      getValues: getValuesFromRef,
      subscribe,
    };

    const rootClass = [styles.root, className].filter(Boolean).join(' ');

    return (
      <FormContext value={contextValue}>
        <form
          className={rootClass}
          onSubmit={handleSubmit}
          onReset={(e) => {
            e.preventDefault();
            handleReset();
          }}
          noValidate
          {...rest}
        >
          {children}
        </form>
      </FormContext>
    );
  },
);

Form.displayName = 'Form';

// ---- FormItem Props ----

export interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Field name — must match the key in Form's values */
  name: string;
  /** Label text */
  label?: string;
  /** Whether the field is required (adds asterisk to label) */
  required?: boolean;
  /** Validation rules */
  rules?: ValidationRule[];
  /** Manual error override (takes priority over form validation) */
  error?: string;
  /** Helper text shown below the field */
  helpText?: string;
  /** Label position */
  labelPosition?: 'top' | 'left';
  /** FormItem content */
  children: ReactNode;
}

// ---- FormItem Component ----

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      name,
      label,
      required = false,
      rules = [],
      error: manualError,
      helpText,
      labelPosition = 'top',
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const formCtx = useFormContext();
    const generatedId = useId();
    const fieldId = `form-field-${generatedId}`;

    // Subscribe to form context changes for error updates
    const [, setTick] = useState(0);

    useEffect(() => {
      if (formCtx) {
        return formCtx.subscribe(() => setTick((prev) => prev + 1));
      }
      return undefined;
    }, [formCtx]);

    // Register field with form context
    useEffect(() => {
      if (formCtx) {
        const allRules = required
          ? [{ type: 'required' as const, message: '' }, ...rules]
          : rules;
        formCtx.registerField(name, allRules);
        return () => formCtx.unregisterField(name);
      }
      return undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formCtx, name, required]);

    // Determine the error to display
    const contextError = formCtx?.getFieldError(name);
    const displayError = manualError || contextError;

    const rootClass = [
      styles.formItem,
      labelPosition === 'left' && styles.horizontal,
      displayError && styles.hasError,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}

        <div className={styles.control}>
          {children}

          {displayError && (
            <span className={styles.error} id={`${fieldId}-error`} role="alert">
              {displayError}
            </span>
          )}

          {!displayError && helpText && (
            <span className={styles.helpText} id={`${fieldId}-help`}>
              {helpText}
            </span>
          )}
        </div>
      </div>
    );
  },
);

FormItem.displayName = 'FormItem';
