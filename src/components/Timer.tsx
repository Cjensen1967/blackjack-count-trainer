import React, { useState, useEffect } from 'react';

/**
 * Props for the Timer component
 */
interface TimerProps {
  /**
   * Initial time in seconds
   * @default 0
   */
  initialTime?: number;
  
  /**
   * Whether the timer is running
   * @default false
   */
  isRunning?: boolean;
  
  /**
   * Callback function when the timer reaches zero
   */
  onComplete?: () => void;
  
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
}

/**
 * Timer component with hours, minutes, and seconds display
 * 
 * This component provides a countdown timer with separate boxes for
 * hours, minutes, and seconds.
 * 
 * @param props - The component props
 * @returns A React component for displaying a timer
 */
const Timer: React.FC<TimerProps> = ({ 
  initialTime = 0, 
  isRunning = false, 
  onComplete,
  className = '' 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0 && onComplete) {
            onComplete();
          }
          return Math.max(0, newTime);
        });
      }, 1000);
    } else if (timeRemaining <= 0 && onComplete) {
      onComplete();
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isRunning, timeRemaining, onComplete]);
  
  // Calculate hours, minutes, seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  // Format with leading zeros
  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };
  
  return (
    <div className={`timer-container ${className}`}>
      <div className="timer-unit">
        <div className="timer-value">{formatTime(hours)}</div>
        <div className="timer-label">Hours</div>
      </div>
      <div className="timer-unit">
        <div className="timer-value">{formatTime(minutes)}</div>
        <div className="timer-label">Minutes</div>
      </div>
      <div className="timer-unit">
        <div className="timer-value">{formatTime(seconds)}</div>
        <div className="timer-label">Seconds</div>
      </div>
    </div>
  );
};

export default Timer;
