import React from 'react';
import PlayingCard from './PlayingCard';
import Button from './UI/Button';
import Input from './UI/Input';
import { useCardDeck } from '../hooks/useCardDeck';
import type { Card } from '../utils/countingUtils';

interface CountSightTrainerProps {
  className?: string;
}

const CountSightTrainer: React.FC<CountSightTrainerProps> = ({ className = '' }) => {
  const {
    cards,
    displayTime,
    isShowingCards,
    userInput,
    feedback,
    dealNewCards,
    handleUserInput,
    submitAnswer,
    resetTimer,
  } = useCardDeck();

  // Format display time in seconds with one decimal place
  const formattedDisplayTime = (displayTime / 1000).toFixed(1);

  return (
    <div className={`count-sight-trainer ${className}`}>
      <div>
        <h1>Blackjack Count Trainer</h1>
        <p>
          Practice your Hi-Lo card counting skills
        </p>
      </div>

      <div>
        <div>
          Display Time: {formattedDisplayTime}s
        </div>
        <Button onClick={resetTimer} variant="secondary" size="sm">
          Reset Timer
        </Button>
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

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button onClick={dealNewCards} variant="primary" size="lg">
          New Drill
        </Button>
      </div>

      <div className="counting-rules">
        <h2>Hi-Lo Counting System</h2>
        <ul>
          <li>Cards 2-6: +1</li>
          <li>Cards 7-9: 0</li>
          <li>Cards 10, J, Q, K, A: -1</li>
        </ul>
      </div>
    </div>
  );
};

export default CountSightTrainer;
