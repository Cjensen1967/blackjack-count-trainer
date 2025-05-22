import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

/**
 * Props for the Layout component
 */
interface LayoutProps {
  /**
   * Title to display in the header
   */
  title: string;
  
  /**
   * Whether to show the back button in the header
   * @default true
   */
  showBackButton?: boolean;
  
  /**
   * Children elements to render within the layout
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
}

/**
 * Layout component that provides a consistent structure for all pages
 * 
 * This component includes a header with title and optional back button,
 * a content area for children, and a bottom navigation bar.
 * 
 * @param props - The component props
 * @returns A React component for the application layout
 */
const Layout: React.FC<LayoutProps> = ({ 
  title, 
  showBackButton = true, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`app-layout ${className}`}>
      <Header title={title} showBackButton={showBackButton} />
      <main className="app-content">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
