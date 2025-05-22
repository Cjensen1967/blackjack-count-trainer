import { useState, useEffect } from 'react';

/**
 * Settings interface defining all configurable options
 */
export interface Settings {
  /**
   * Time to display cards before hiding them (in milliseconds)
   */
  displayTime: 3000 | 5000 | 10000 | 15000;
  
  /**
   * Number of cards to display in each round
   */
  numberOfCards: 3 | 6 | 9 | 12;
  
  /**
   * Whether to show the timer during training
   */
  showTimer: boolean;
  
  /**
   * Direction for the timer to count
   */
  timerDirection: 'up' | 'down';
  
  /**
   * Duration for the training session timer (in seconds)
   */
  timerDuration: number;
  
  /**
   * Type of drill to perform
   */
  drillType: 'standard' | 'deckTraining';
}

/**
 * Default settings to use when no saved settings exist
 */
const defaultSettings: Settings = {
  displayTime: 5000,
  numberOfCards: 12,
  showTimer: true,
  timerDirection: 'down',
  timerDuration: 60,
  drillType: 'standard',
};

/**
 * Return type for the useSettings hook
 */
interface UseSettingsReturn {
  /** Current settings object */
  settings: Settings;
  
  /** Function to update display time */
  updateDisplayTime: (value: Settings['displayTime']) => void;
  
  /** Function to update number of cards */
  updateNumberOfCards: (value: Settings['numberOfCards']) => void;
  
  /** Function to toggle timer visibility */
  toggleShowTimer: () => void;
  
  /** Function to toggle timer direction */
  toggleTimerDirection: () => void;
  
  /** Function to update timer duration */
  updateTimerDuration: (value: number) => void;
  
  /** Function to toggle drill type */
  toggleDrillType: () => void;
}

/**
 * Custom hook for managing application settings
 * 
 * This hook provides functionality for:
 * - Loading default settings
 * - Loading saved settings from localStorage
 * - Updating and saving settings
 * - Persisting settings between sessions
 * 
 * @returns An object containing the current settings and functions to update them
 */
export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('blackjackTrainerSettings');
    
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
        // If parsing fails, use default settings
        setSettings(defaultSettings);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blackjackTrainerSettings', JSON.stringify(settings));
  }, [settings]);

  // Update display time
  const updateDisplayTime = (value: Settings['displayTime']) => {
    setSettings((prev) => ({
      ...prev,
      displayTime: value,
    }));
  };

  // Update number of cards
  const updateNumberOfCards = (value: Settings['numberOfCards']) => {
    setSettings((prev) => ({
      ...prev,
      numberOfCards: value,
    }));
  };

  // Toggle timer visibility
  const toggleShowTimer = () => {
    setSettings((prev) => ({
      ...prev,
      showTimer: !prev.showTimer,
    }));
  };

  // Toggle timer direction
  const toggleTimerDirection = () => {
    setSettings((prev) => ({
      ...prev,
      timerDirection: prev.timerDirection === 'up' ? 'down' : 'up',
    }));
  };

  // Update timer duration
  const updateTimerDuration = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      timerDuration: value,
    }));
  };

  // Toggle drill type
  const toggleDrillType = () => {
    setSettings((prev) => ({
      ...prev,
      drillType: prev.drillType === 'standard' ? 'deckTraining' : 'standard',
    }));
  };

  return {
    settings,
    updateDisplayTime,
    updateNumberOfCards,
    toggleShowTimer,
    toggleTimerDirection,
    updateTimerDuration,
    toggleDrillType,
  };
};
