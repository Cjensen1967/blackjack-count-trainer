import React from 'react';

/**
 * Props for the Toggle component
 */
interface ToggleProps {
  /**
   * Current value of the toggle (true = on, false = off)
   */
  value: boolean;
  
  /**
   * Function to call when the toggle value changes
   */
  onChange: () => void;
  
  /**
   * Label to display next to the toggle
   */
  label?: string;
  
  /**
   * Additional CSS class names to apply to the toggle
   */
  className?: string;
  
  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Custom toggle switch component with a modern design
 * 
 * This component provides a toggle switch with a sliding handle.
 * It follows the design from the provided HTML sample.
 * 
 * @param props - The component props
 * @returns A styled toggle switch component
 */
const Toggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  label,
  className = '',
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange();
    }
  };
  
  return (
    <div className={`toggle-container ${className}`}>
      <label
        className={`toggle ${value ? 'toggle-active' : ''} ${disabled ? 'toggle-disabled' : ''}`}
        onClick={handleClick}
      >
        <div className="toggle-handle" />
        <input 
          type="checkbox" 
          checked={value} 
          onChange={onChange}
          disabled={disabled}
          className="toggle-input"
          aria-label={label || "Toggle switch"}
        />
        <span className="sr-only">{label || "Toggle switch"}</span>
      </label>
      {label && <span className="toggle-label">{label}</span>}
    </div>
  );
};

export default Toggle;
