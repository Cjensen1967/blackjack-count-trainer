import { useState, useCallback, useEffect, useRef } from 'react';
import type { Card } from '../utils/countingUtils';
import { generateDeck, dealCards, calculateTotalCount } from '../utils/countingUtils';

/**
 * Configuration options for the useCardDeck hook
 */
interface UseCardDeckProps {
  /**
   * Initial time (in milliseconds) to display cards before hiding them
   * @default 10000 (10 seconds)
   */
  initialDisplayTime?: number;
  
  /**
   * Minimum display time (in milliseconds) that the timer can decrease to
   * @default 2000 (2 seconds)
   */
  minDisplayTime?: number;
  
  /**
   * Amount (in milliseconds) to decrease the display time after a correct answer
   * @default 200 (0.2 seconds)
   */
  timeDecrement?: number;
  
  /**
   * Amount (in milliseconds) to increase the display time after an incorrect answer
   * @default 200 (0.2 seconds)
   */
  timeIncrement?: number;
  
  /**
   * Number of cards to deal in each round
   * @default 12
   */
  cardsPerDeal?: number;
}

/**
 * Return type for the useCardDeck hook
 */
interface UseCardDeckReturn {
  /** Array of currently dealt cards */
  cards: Card[];
  
  /** The correct count value for the current set of cards */
  correctCount: number;
  
  /** Current display time in milliseconds */
  displayTime: number;
  
  /** Whether cards are currently visible or hidden */
  isShowingCards: boolean;
  
  /** Current value of the user input field */
  userInput: string;
  
  /** Feedback message after user submits an answer */
  feedback: string | null;
  
  /** Function to deal a new set of cards and start a new round */
  dealNewCards: () => void;
  
  /** Function to handle changes to the user input field */
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Function to submit and check the user's answer */
  submitAnswer: () => void;
  
  /** Function to reset the timer to the initial value */
  resetTimer: () => void;
}

/**
 * Custom hook for managing a card deck and implementing the card counting training logic
 * 
 * This hook provides functionality for:
 * - Dealing cards from a standard deck
 * - Managing the display time for cards (adaptive difficulty)
 * - Handling user input for card counting answers
 * - Providing feedback on user performance
 * - Adjusting difficulty based on user performance
 * 
 * The adaptive timing system automatically adjusts the display time:
 * - Correct answers: Display time decreases by timeDecrement (making it more challenging)
 * - Incorrect answers: Display time increases by timeIncrement (making it easier)
 * - The display time is bounded by minDisplayTime and initialDisplayTime
 * 
 * @param options - Configuration options for the card deck behavior
 * @returns An object containing the current state and functions to interact with the card deck
 */
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
  // Timer reference to track and clear timeouts
  const timerRef = useRef<number | null>(null);

  // Deal new cards
  const dealNewCards = useCallback(() => {
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    const newCards = dealCards(deck, cardsPerDeal);
    setCards(newCards);
    setCorrectCount(calculateTotalCount(newCards));
    setIsShowingCards(true); // Always show cards
    setUserInput('');
    setFeedback(null);
    
    // Hide cards after displayTime
    timerRef.current = setTimeout(() => {
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
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
