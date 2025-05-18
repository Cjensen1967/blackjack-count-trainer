import { useState, useCallback, useEffect } from 'react';
import type { Card } from '../utils/countingUtils';
import { generateDeck, dealCards, calculateTotalCount } from '../utils/countingUtils';

interface UseCardDeckProps {
  initialDisplayTime?: number;
  minDisplayTime?: number;
  timeDecrement?: number;
  timeIncrement?: number;
  cardsPerDeal?: number;
}

interface UseCardDeckReturn {
  cards: Card[];
  correctCount: number;
  displayTime: number;
  isShowingCards: boolean;
  userInput: string;
  feedback: string | null;
  dealNewCards: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitAnswer: () => void;
  resetTimer: () => void;
}

export const useCardDeck = ({
  initialDisplayTime = 10000, // 10 seconds
  minDisplayTime = 2000, // 2 seconds
  timeDecrement = 200, // 200ms
  timeIncrement = 200, // 200ms
  cardsPerDeal = 12,
}: UseCardDeckProps = {}): UseCardDeckReturn => {
  const [deck] = useState<Card[]>(generateDeck());
  const [cards, setCards] = useState<Card[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [displayTime, setDisplayTime] = useState<number>(initialDisplayTime);
  const [isShowingCards, setIsShowingCards] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Deal new cards
  const dealNewCards = useCallback(() => {
    const newCards = dealCards(deck, cardsPerDeal);
    setCards(newCards);
    setCorrectCount(calculateTotalCount(newCards));
    setIsShowingCards(true);
    setUserInput('');
    setFeedback(null);
    
    // Hide cards after displayTime
    setTimeout(() => {
      setIsShowingCards(false);
    }, displayTime);
  }, [deck, cardsPerDeal, displayTime]);

  // Handle user input
  const handleUserInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and minus sign
    const value = e.target.value.replace(/[^0-9-]/g, '');
    setUserInput(value);
  }, []);

  // Submit answer
  const submitAnswer = useCallback(() => {
    const userCount = parseInt(userInput, 10);
    
    if (isNaN(userCount)) {
      setFeedback('Please enter a valid number.');
      return;
    }
    
    const isCorrect = userCount === correctCount;
    
    if (isCorrect) {
      setFeedback('Correct!');
      // Decrease time for next round (but not below minimum)
      setDisplayTime((prevTime) => Math.max(minDisplayTime, prevTime - timeDecrement));
    } else {
      setFeedback(`Incorrect. The correct count was ${correctCount}.`);
      // Increase time for next round (but not above initial)
      setDisplayTime((prevTime) => Math.min(initialDisplayTime, prevTime + timeIncrement));
    }
  }, [userInput, correctCount, minDisplayTime, timeDecrement, initialDisplayTime, timeIncrement]);

  // Reset timer to initial value
  const resetTimer = useCallback(() => {
    setDisplayTime(initialDisplayTime);
    setFeedback('Timer reset to initial value.');
  }, [initialDisplayTime]);

  // Deal cards on first render
  useEffect(() => {
    dealNewCards();
  }, [dealNewCards]);

  return {
    cards,
    correctCount,
    displayTime,
    isShowingCards,
    userInput,
    feedback,
    dealNewCards,
    handleUserInput,
    submitAnswer,
    resetTimer,
  };
};
