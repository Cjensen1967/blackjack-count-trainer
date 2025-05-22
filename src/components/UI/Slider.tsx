import React, { useState, useEffect, useRef } from 'react';

/**
 * Props for the Slider component
 */
interface SliderProps {
  /**
   * Minimum value of the slider
   */
  min: number;
  
  /**
   * Maximum value of the slider
   */
  max: number;
  
  /**
   * Step size for the slider
   */
  step: number;
  
  /**
   * Current value of the slider
   */
  value: number;
  
  /**
   * Function to call when the slider value changes
   */
  onChange: (value: number) => void;
  
  /**
   * Value to display next to the slider
   */
  displayValue?: string;
  
  /**
   * Additional CSS class names to apply to the slider
   */
  className?: string;
}

/**
 * Custom slider component with a modern design
 * 
 * This component provides a slider with a progress bar and a draggable handle.
 * It follows the design from the provided HTML sample.
 * 
 * @param props - The component props
 * @returns A styled slider component
 */
const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  displayValue,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Calculate the percentage of the current value within the range
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Handle mouse down on the slider handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  // Handle touch start on the slider handle
  const handleTouchStart = () => {
    setIsDragging(true);
  };
  
  // Handle mouse move or touch move
  const handleMove = (clientX: number) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = rect.width;
    const offsetX = clientX - rect.left;
    
    // Calculate the new value based on the position
    let newPercentage = Math.max(0, Math.min(100, (offsetX / sliderWidth) * 100));
    let newValue = min + (newPercentage / 100) * (max - min);
    
    // Round to the nearest step
    newValue = Math.round(newValue / step) * step;
    
    // Ensure the value is within bounds
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Only update if the value has changed
    if (newValue !== value) {
      onChange(newValue);
    }
  };
  
  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };
  
  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };
  
  // Handle mouse up or touch end
  const handleEnd = () => {
    setIsDragging(false);
  };
  
  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);
  
  return (
    <div className={`slider-container ${className}`}>
      <div className="slider-track-container">
        <div 
          ref={sliderRef}
          className="slider-track"
        >
          <div 
            className="slider-progress"
            style={{ width: `${percentage}%` }}
          />
          <div 
            className="slider-handle"
            style={{ left: `${percentage}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </div>
      </div>
      {displayValue && (
        <div className="slider-value">{displayValue}</div>
      )}
    </div>
  );
};

export default Slider;
