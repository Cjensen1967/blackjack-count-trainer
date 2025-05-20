import React, { useRef, useEffect } from 'react';
import PlayingCard from './PlayingCard';
import Button from './UI/Button';
import Input from './UI/Input';
import { useCardDeck } from '../hooks/useCardDeck';
import type { Card } from '../utils/countingUtils';

/**
 * Props for the CountSightTrainer component
 */
interface CountSightTrainerProps {
  /**
   * Additional CSS class names to apply to the component
   * @default ''
   */
  className?: string;
  
  /**
   * Optional function to handle creating a new drill
   * If provided, this will be used instead of the internal dealNewCards function
   */
  onNewDrill?: () => void;
}

/**
 * Main component for the blackjack card counting training application
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
const CountSightTrainer: React.FC<CountSightTrainerProps> = ({ className = '', onNewDrill }) => {
  const {
    cards,
    isShowingCards,
    userInput,
    feedback,
    dealNewCards,
    handleUserInput,
    submitAnswer,
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

  return (
    <div className={`count-sight-trainer ${className}`}>
      <div>
        <p>
          Practice your Hi-Lo card counting skills
        </p>
      </div>

      <div className="casino-felt">
        <div className={`card-area ${isShowingCards ? '' : 'input-mode'}`}>
          <div className="card-grid">
            {cards.map((card: Card, index: number) => (
              <div key={`${card.suit}_${card.rank}_${index}`} className="card-slot">
                <PlayingCard suit={card.suit} rank={card.rank} visible={isShowingCards} />
              </div>
            ))}
          </div>

          {!isShowingCards && (
            <div className="centered-input-container">
              <div className="centered-input">
                <Input
                  id="count-input"
                  label="What's the count?"
                  value={userInput}
                  onChange={handleUserInput}
                  type="text"
                  placeholder="Enter count..."
                  className="count-input"
                  inputRef={inputRef}
                />
                <Button onClick={submitAnswer} className="submit-button">
                  Submit
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
      </div>


    </div>
  );
};

export default CountSightTrainer;
