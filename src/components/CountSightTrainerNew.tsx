import React, { useRef, useEffect } from 'react';
import PlayingCard from './PlayingCard';
import Button from './UI/Button';
import Input from './UI/Input';
import Timer from './Timer';
import { useCardDeck } from '../hooks/useCardDeck';
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
  const {
    cards,
    isShowingCards,
    userInput,
    feedback,
    dealNewCards,
    handleUserInput,
    submitAnswer,
    displayTime,
  } = useCardDeck();

  // Create a ref for the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Deal new cards when component mounts or when key changes
  useEffect(() => {
    dealNewCards();
  }, [dealNewCards]);

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

  // Convert display time from milliseconds to seconds for the timer
  const timerSeconds = Math.floor(displayTime / 1000);

  return (
    <div className={`count-sight-trainer-new ${className}`}>
      {/* Timer display */}
      <Timer initialTime={timerSeconds} isRunning={isShowingCards} />
      
      {/* Main heading */}
      <h3 className="count-heading">Count the cards</h3>
      
      {/* Card grid */}
      <div className={`card-grid-new ${isShowingCards ? '' : 'input-mode'}`}>
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
