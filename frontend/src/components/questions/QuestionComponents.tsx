import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import type { ReactNode } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface QuestionFieldProps {
  label: string;
  helper?: string;
  children: ReactNode;
}

export function QuestionField({ label, helper, children }: QuestionFieldProps) {
  return (
    <label className="jh-field">
      <span>{label}</span>
      {children}
      {helper ? <small>{helper}</small> : null}
    </label>
  );
}

interface TextQuestionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  multiline?: boolean;
  name?: string;
}

export function TextQuestion({
  label,
  value,
  onChange,
  placeholder,
  helper,
  multiline,
  name,
}: TextQuestionProps) {
  return (
    <QuestionField label={label} helper={helper}>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </QuestionField>
  );
}

interface InputQuestionProps {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  listId?: string;
  ariaLabel?: string;
}

export function InputQuestion({
  label,
  type,
  value,
  onChange,
  placeholder,
  helper,
  name,
  min,
  max,
  step,
  listId,
  ariaLabel,
}: InputQuestionProps) {
  return (
    <QuestionField label={label} helper={helper}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        list={listId}
        aria-label={ariaLabel}
      />
    </QuestionField>
  );
}

interface SelectQuestionProps {
  label: string;
  value: string | string[];
  options: Option[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  helper?: string;
  name?: string;
  ariaLabel?: string;
}

export function SelectQuestion({
  label,
  value,
  options,
  onChange,
  multiple,
  helper,
  name,
  ariaLabel,
}: SelectQuestionProps) {
  return (
    <QuestionField label={label} helper={helper}>
      <select
        name={name}
        multiple={multiple}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          if (multiple) {
            onChange(Array.from(e.target.selectedOptions, (opt) => opt.value));
          } else {
            onChange(e.target.value);
          }
        }}
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </QuestionField>
  );
}

interface ChipGroupQuestionProps {
  label: string;
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  mode: 'single' | 'multi';
  name: string;
  ariaLabel?: string;
}

export function ChipGroupQuestion({
  label,
  options,
  value,
  onChange,
  mode,
  name,
  ariaLabel,
}: ChipGroupQuestionProps) {
  const isSelected = (val: string) =>
    Array.isArray(value) ? value.includes(val) : value === val;

  const handleChange = (val: string, checked: boolean) => {
    if (mode === 'single') {
      onChange(val);
    } else {
      if (!Array.isArray(value)) return;
      if (checked) {
        onChange([...value, val]);
      } else {
        onChange(value.filter((v) => v !== val));
      }
    }
  };

  return (
    <div className="jh-field">
      <span>{label}</span>
      <div className="jh-inline-options" role={mode === 'single' ? 'radiogroup' : 'group'} aria-label={ariaLabel}>
        {options.map((opt) => (
          <label key={opt.value} className="jh-chip-option">
            <input
              type={mode === 'single' ? 'radio' : 'checkbox'}
              name={name}
              value={opt.value}
              checked={isSelected(opt.value)}
              onChange={(e) => handleChange(opt.value, e.target.checked)}
            />
            <span className="jh-chip-label">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface RangeQuestionProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  displayValue?: string;
}

export function RangeQuestion({ label, value, onChange, min, max, step, displayValue }: RangeQuestionProps) {
  return (
    <QuestionField label={label}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {displayValue ? <div className="jh-range-value">{displayValue}</div> : null}
    </QuestionField>
  );
}

interface FileQuestionProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  helper?: string;
  name?: string;
}

export function FileQuestion({ label, accept, onChange, helper, name }: FileQuestionProps) {
  return (
    <QuestionField label={label} helper={helper}>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={(e) => onChange(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)}
      />
    </QuestionField>
  );
}

interface ToggleQuestionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
}

export function ToggleQuestion({ label, checked, onChange, name }: ToggleQuestionProps) {
  return (
    <label className="jh-toggle">
      <input type="checkbox" name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

interface DatalistQuestionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  listId: string;
  options: Option[];
  placeholder?: string;
}

export function DatalistQuestion({ label, value, onChange, listId, options, placeholder }: DatalistQuestionProps) {
  return (
    <QuestionField label={label}>
      <input
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <datalist id={listId}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} />
        ))}
      </datalist>
    </QuestionField>
  );
}
