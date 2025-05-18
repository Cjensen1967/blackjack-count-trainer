/**
 * Card counting utilities for the Hi-Lo system
 */

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';

export interface Card {
  suit: Suit;
  rank: Rank;
}

/**
 * Get the Hi-Lo count value for a card
 * 
 * Hi-Lo counting system:
 * - Cards 2-6: +1
 * - Cards 7-9: 0
 * - Cards 10, J, Q, K, A: -1
 */
export const getCardCountValue = (rank: Rank): number => {
  if (['2', '3', '4', '5', '6'].includes(rank)) {
    return 1;
  } else if (['7', '8', '9'].includes(rank)) {
    return 0;
  } else {
    // 10, J, Q, K, A
    return -1;
  }
};

/**
 * Calculate the total count for an array of cards
 */
export const calculateTotalCount = (cards: Card[]): number => {
  return cards.reduce((total, card) => total + getCardCountValue(card.rank), 0);
};

/**
 * Generate a random card
 */
export const generateRandomCard = (): Card => {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
  
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
  
  return { suit: randomSuit, rank: randomRank };
};

/**
 * Generate a deck of cards (52 cards, no jokers)
 */
export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
  
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  
  return deck;
};

/**
 * Shuffle an array using the Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Deal a specified number of cards from a deck
 */
export const dealCards = (deck: Card[], count: number): Card[] => {
  // Shuffle the deck first
  const shuffledDeck = shuffleArray(deck);
  // Return the first 'count' cards
  return shuffledDeck.slice(0, count);
};
