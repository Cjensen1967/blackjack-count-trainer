import React from 'react';

/**
 * Props for the Button component
 */
interface ButtonProps {
  /**
   * Content to be rendered inside the button
   */
  children: React.ReactNode;
  
  /**
   * Function to call when the button is clicked
   */
  onClick?: () => void;
  
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';
  
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS class names to apply to the button
   * @default ''
   */
  className?: string;
  
  /**
   * HTML button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Reusable button component with various style options
 * 
 * This component provides a consistent button styling across the application
 * with support for different variants, sizes, and states.
 * 
 * @param props - The component props
 * @returns A styled button component
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  return (
    <button
      type={type}
      className={`button button-${variant} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
