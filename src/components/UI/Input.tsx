import React from 'react';

/**
 * Props for the Input component
 */
interface InputProps {
  /**
   * Unique identifier for the input element
   */
  id: string;
  
  /**
   * Label text to display above the input
   */
  label?: string;
  
  /**
   * Current value of the input
   */
  value: string | number;
  
  /**
   * Function to call when the input value changes
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * HTML input type attribute
   * @default 'text'
   */
  type?: string;
  
  /**
   * Placeholder text to display when the input is empty
   * @default ''
   */
  placeholder?: string;
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Additional CSS class names to apply to the input
   * @default ''
   */
  className?: string;
  
  /**
   * Minimum value for number inputs
   */
  min?: number;
  
  /**
   * Maximum value for number inputs
   */
  max?: number;
  
  /**
   * Step value for number inputs
   */
  step?: number;
}

/**
 * Reusable input component with label support
 * 
 * This component provides a consistent input styling across the application
 * with support for labels and various input attributes.
 * 
 * @param props - The component props
 * @returns A styled input component with optional label
 */
const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  required = false,
  className = '',
  min,
  max,
  step,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`input ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      />
    </div>
  );
};

export default Input;
