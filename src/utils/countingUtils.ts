/**
 * Card counting utilities for the Hi-Lo system
 * 
 * This module provides functions and types for implementing the Hi-Lo card counting
 * strategy in blackjack. The Hi-Lo system assigns values to cards:
 * - Cards 2-6: +1 (low cards)
 * - Cards 7-9: 0 (neutral cards)
 * - Cards 10, J, Q, K, A: -1 (high cards)
 * 
 * By tracking the running count, players can gain an advantage in blackjack.
 */

/**
 * Represents the four standard playing card suits
 */
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

/**
 * Represents the thirteen standard playing card ranks
 */
export type Rank = 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';

/**
 * Represents a standard playing card with a suit and rank
 */
export interface Card {
  suit: Suit;
  rank: Rank;
}

/**
 * Get the Hi-Lo count value for a card
 * 
 * Hi-Lo counting system:
 * - Cards 2-6: +1 (low cards favor the dealer)
 * - Cards 7-9: 0 (neutral cards)
 * - Cards 10, J, Q, K, A: -1 (high cards favor the player)
 * 
 * @param rank - The rank of the card to evaluate
 * @returns The count value (-1, 0, or +1) according to the Hi-Lo system
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
 * 
 * This function sums the count values of all cards in the array using the Hi-Lo system.
 * A positive result indicates a player advantage (more low cards have been seen),
 * while a negative result indicates a dealer advantage (more high cards have been seen).
 * 
 * @param cards - An array of Card objects to calculate the count for
 * @returns The total count value for all cards in the array
 */
export const calculateTotalCount = (cards: Card[]): number => {
  return cards.reduce((total, card) => total + getCardCountValue(card.rank), 0);
};

/**
 * Generate a random card
 * 
 * Creates a new card with a randomly selected suit and rank.
 * Each suit and rank has an equal probability of being selected.
 * 
 * @returns A new randomly generated Card object
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
 * 
 * Creates a standard deck of playing cards containing all combinations
 * of the four suits and thirteen ranks (52 cards total).
 * The deck is returned in a systematic order (not shuffled).
 * 
 * @returns An array of 52 Card objects representing a complete deck
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
 * 
 * Implements the Fisher-Yates (also known as Knuth) shuffle algorithm
 * to randomly reorder the elements of an array. This algorithm runs in O(n) time
 * and produces an unbiased permutation (every permutation is equally likely).
 * 
 * @param array - The array to shuffle
 * @returns A new array with the same elements in a random order
 * @template T - The type of elements in the array
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
 * 
 * Shuffles the provided deck and returns the specified number of cards
 * from the top of the shuffled deck. This simulates dealing cards in a casino.
 * 
 * @param deck - The deck of cards to deal from
 * @param count - The number of cards to deal
 * @returns An array of Card objects representing the dealt cards
 */
export const dealCards = (deck: Card[], count: number): Card[] => {
  // Shuffle the deck first
  const shuffledDeck = shuffleArray(deck);
  // Return the first 'count' cards
  return shuffledDeck.slice(0, count);
};
