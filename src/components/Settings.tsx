import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import Slider from './UI/Slider';
import Toggle from './UI/Toggle';

/**
 * Props for the Settings component
 */
interface SettingsProps {
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
}

/**
 * Settings component for configuring the training experience
 * 
 * This component provides a user interface for adjusting various settings:
 * - Drill type (standard or deck training)
 * - Number of cards to display
 * - Display time for cards
 * - Timer visibility and behavior
 * 
 * All settings are automatically saved to localStorage when changed.
 * 
 * @param props - The component props
 * @returns A React component for configuring application settings
 */
const Settings: React.FC<SettingsProps> = ({ className = '' }) => {
  const {
    settings,
    updateDisplayTime,
    updateNumberOfCards,
    toggleShowTimer,
    toggleTimerDirection,
    updateTimerDuration,
    toggleDrillType,
  } = useSettings();

  // Handle display time change
  const handleDisplayTimeChange = (value: number) => {
    // Convert seconds to milliseconds and ensure it's one of the allowed values
    const timeInMs = value * 1000;
    updateDisplayTime(timeInMs as 3000 | 5000 | 10000 | 15000);
  };

  // Handle number of cards change
  const handleNumberOfCardsChange = (value: number) => {
    // Ensure it's one of the allowed values
    updateNumberOfCards(value as 3 | 6 | 9 | 12);
  };

  // Handle timer duration change
  const handleTimerDurationChange = (value: number) => {
    updateTimerDuration(value);
  };

  return (
    <div className={`settings-container ${className}`}>
      <h3 className="settings-heading">Drill Type</h3>
      <div className="setting-item">
        <p className="setting-label">Drill Type</p>
        <div className="setting-control">
          <Toggle
            value={settings.drillType === 'deckTraining'}
            onChange={toggleDrillType}
            label={settings.drillType === 'standard' ? 'Standard' : 'Deck Training'}
          />
        </div>
      </div>

      <h3 className="settings-heading">Card Display</h3>
      <div className="setting-item">
        <div className="setting-label-container">
          <p className="setting-label">Number of Cards</p>
          <p className="setting-value-mobile">{settings.numberOfCards}</p>
        </div>
        <div className="setting-control">
          <Slider
            min={3}
            max={12}
            step={3}
            value={settings.numberOfCards}
            onChange={handleNumberOfCardsChange}
            displayValue={settings.numberOfCards.toString()}
          />
        </div>
      </div>

      <div className="setting-item">
        <div className="setting-label-container">
          <p className="setting-label">Card Display Time</p>
          <p className="setting-value-mobile">{settings.displayTime / 1000}s</p>
        </div>
        <div className="setting-control">
          <Slider
            min={3}
            max={15}
            step={1}
            value={settings.displayTime / 1000}
            onChange={handleDisplayTimeChange}
            displayValue={`${settings.displayTime / 1000}s`}
          />
        </div>
      </div>

      <h3 className="settings-heading">Session Timer</h3>
      <div className="setting-item">
        <p className="setting-label">Show Timer</p>
        <div className="setting-control">
          <Toggle
            value={settings.showTimer}
            onChange={toggleShowTimer}
          />
        </div>
      </div>

      <div className="setting-item">
        <p className="setting-label">Timer Direction</p>
        <div className="setting-control">
          <Toggle
            value={settings.timerDirection === 'down'}
            onChange={toggleTimerDirection}
            label={settings.timerDirection === 'up' ? 'Count Up' : 'Count Down'}
          />
        </div>
      </div>

      <div className="setting-item">
        <div className="setting-label-container">
          <p className="setting-label">Session Duration</p>
          <p className="setting-value-mobile">{settings.timerDuration}s</p>
        </div>
        <div className="setting-control">
          <Slider
            min={30}
            max={120}
            step={30}
            value={settings.timerDuration}
            onChange={handleTimerDurationChange}
            displayValue={`${settings.timerDuration}s`}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
