import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Props for the Header component
 */
interface HeaderProps {
  /**
   * Title to display in the header
   */
  title: string;
  
  /**
   * Whether to show the back button
   * @default true
   */
  showBackButton?: boolean;
  
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
}

/**
 * Header component with title and optional back button
 * 
 * This component provides a consistent header across the application
 * with a title and an optional back button for navigation.
 * 
 * @param props - The component props
 * @returns A React component for the application header
 */
const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = true, 
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (location.pathname === '/') {
      // We're already at the home page, do nothing
      return;
    }
    navigate(-1);
  };
  
  return (
    <div className={`app-header ${className}`}>
      {showBackButton && (
        <div className="back-button" onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
      )}
      <h2 className="header-title">{title}</h2>
      <div className="header-spacer"></div>
    </div>
  );
};

export default Header;
