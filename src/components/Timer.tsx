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
   * Direction for the timer to count
   * @default 'down'
   */
  countDirection?: 'up' | 'down';
  
  /**
   * Callback function when the timer reaches zero (for countdown)
   * or the specified duration (for count up)
   */
  onComplete?: () => void;
  
  /**
   * Maximum time for count up timer (in seconds)
   * When reached, onComplete will be called
   * @default undefined
   */
  maxTime?: number;
  
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
  countDirection = 'down',
  onComplete,
  maxTime,
  className = '' 
}) => {
  const [time, setTime] = useState(initialTime);
  
  useEffect(() => {
    // Reset time when initialTime changes
    setTime(initialTime);
  }, [initialTime]);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(prevTime => {
          let newTime;
          
          if (countDirection === 'down') {
            // Count down
            newTime = prevTime - 1;
            if (newTime <= 0 && onComplete) {
              onComplete();
              return 0;
            }
            return Math.max(0, newTime);
          } else {
            // Count up
            newTime = prevTime + 1;
            if (maxTime && newTime >= maxTime && onComplete) {
              onComplete();
              return maxTime;
            }
            return newTime;
          }
        });
      }, 1000);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isRunning, countDirection, onComplete, maxTime]);
  
  // Calculate hours, minutes, seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  
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
