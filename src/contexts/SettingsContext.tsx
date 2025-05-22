import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
 * Interface for the settings context value
 */
interface SettingsContextValue {
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

// Create the context with a default value
const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

/**
 * Props for the SettingsProvider component
 */
interface SettingsProviderProps {
  /** Child components that will have access to the settings context */
  children: ReactNode;
}

/**
 * Provider component for the settings context
 * 
 * This component manages the settings state and provides it to all child components.
 * It also handles loading settings from localStorage and saving changes.
 * 
 * @param props - The component props
 * @returns A context provider for settings
 */
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
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

  // Create the context value object
  const contextValue: SettingsContextValue = {
    settings,
    updateDisplayTime,
    updateNumberOfCards,
    toggleShowTimer,
    toggleTimerDirection,
    updateTimerDuration,
    toggleDrillType,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Custom hook for accessing the settings context
 * 
 * This hook provides access to the settings context and its functions.
 * It throws an error if used outside of a SettingsProvider.
 * 
 * @returns The settings context value
 */
export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
};
