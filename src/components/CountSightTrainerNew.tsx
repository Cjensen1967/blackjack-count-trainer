import React, { useRef, useEffect, useState } from 'react';
import PlayingCard from './PlayingCard';
import Button from './UI/Button';
import Input from './UI/Input';
import Timer from './Timer';
import { useCardDeck } from '../hooks/useCardDeck';
import { useSettings } from '../contexts/SettingsContext';
import type { Card } from '../utils/countingUtils';

/**
 * Props for the CountSightTrainerNew component
 */
interface CountSightTrainerNewProps {
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
}

/**
 * Updated version of the CountSightTrainer component with new UI design
 * 
 * This component provides the core functionality for practicing card counting:
 * 1. Displays a set of random cards for a limited time
 * 2. Hides the cards and prompts the user to enter the count
 * 3. Provides feedback on the user's answer
 * 4. Adjusts difficulty based on performance
 * 
 * The component uses the useCardDeck hook to manage the game state and logic.
 * 
 * @param props - The component props
 * @returns A React component for card counting practice
 */
const CountSightTrainerNew: React.FC<CountSightTrainerNewProps> = ({ className = '' }) => {
  const { settings } = useSettings();
  
  const {
    cards,
    isShowingCards,
    userInput,
    feedback,
    dealNewCards,
    handleUserInput,
    submitAnswer,
    displayTime,
  } = useCardDeck({
    initialDisplayTime: settings.displayTime,
    cardsPerDeal: settings.numberOfCards,
  });
  
  // State for session timer
  const [sessionTimerRunning, setSessionTimerRunning] = useState(true);

  // Create a ref for the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Deal new cards when component mounts or when settings change
  useEffect(() => {
    dealNewCards();
  }, [dealNewCards, settings.numberOfCards, settings.displayTime]);

  // Auto-focus on the input field when cards are initially hidden
  useEffect(() => {
    // Only focus when transitioning from showing cards to hidden
    if (!isShowingCards && inputRef.current) {
      // Add a small delay to ensure it doesn't interfere with button clicks
      const focusTimer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      
      return () => clearTimeout(focusTimer);
    }
  }, [isShowingCards]);

  // Handle session timer completion
  const handleSessionTimerComplete = () => {
    // You can add logic here for what happens when the session timer completes
    setSessionTimerRunning(false);
  };

  // Convert display time from milliseconds to seconds for the card display timer
  const timerSeconds = Math.floor(displayTime / 1000);

  return (
    <div className={`count-sight-trainer-new ${className}`}>
      {/* Card display timer - shows how long cards are visible */}
      {isShowingCards && (
        <div className="card-display-timer">
          <Timer 
            initialTime={timerSeconds} 
            isRunning={isShowingCards} 
            countDirection={settings.timerDirection}
          />
        </div>
      )}
      
      {/* Session timer - tracks overall training session */}
      {settings.showTimer && (
        <div className="session-timer">
          <Timer 
            initialTime={settings.timerDirection === 'down' ? settings.timerDuration : 0}
            maxTime={settings.timerDirection === 'up' ? settings.timerDuration : undefined}
            isRunning={sessionTimerRunning} 
            countDirection={settings.timerDirection}
            onComplete={handleSessionTimerComplete}
            className="session-timer-display"
          />
        </div>
      )}
      
      {/* Main heading */}
      <h3 className="count-heading">Count the cards</h3>
      
      {/* Card grid */}
      <div 
        className={`card-grid-new ${isShowingCards ? '' : 'input-mode'}`}
        style={{ 
          gridTemplateColumns: `repeat(${Math.min(3, settings.numberOfCards)}, 1fr)`,
          gridTemplateRows: `repeat(${Math.ceil(settings.numberOfCards / 3)}, 1fr)`
        }}
      >
        {cards.map((card: Card, index: number) => (
          <div key={`${card.suit}_${card.rank}_${index}`} className="card-slot-new">
            <PlayingCard suit={card.suit} rank={card.rank} visible={isShowingCards} />
          </div>
        ))}
      </div>

      {/* Input area */}
      {!isShowingCards && (
        <div className="input-area">
          <Input
            id="count-input"
            placeholder="What's the count?"
            value={userInput}
            onChange={handleUserInput}
            type="text"
            className="count-input-new"
            inputRef={inputRef}
          />
          
          <div className="button-container">
            <Button onClick={submitAnswer} variant="primary" className="submit-button-new">
              Submit
            </Button>
          </div>
          
          <div className="button-container">
            <Button onClick={dealNewCards} variant="secondary" className="new-drill-button-new">
              New Drill
            </Button>
          </div>

          {feedback && (
            <div
              className={`feedback ${
                feedback.startsWith('Correct')
                  ? 'feedback-correct'
                  : feedback.startsWith('Incorrect')
                  ? 'feedback-incorrect'
                  : 'feedback-info'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountSightTrainerNew;
