import React from 'react';

/**
 * Props for the PlayingCard component
 */
interface PlayingCardProps {
  /**
   * The suit of the playing card
   */
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  
  /**
   * The rank of the playing card
   */
  rank: 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';
  
  /**
   * Whether the card is visible or hidden
   * @default true
   */
  visible?: boolean;
}

/**
 * Component for rendering a playing card
 * 
 * This component displays a playing card using SVG images from the public directory.
 * Cards can be shown or hidden based on the visible prop, which is used for
 * the card counting training functionality.
 * 
 * @param props - The component props
 * @returns A React component representing a playing card
 */
const PlayingCard: React.FC<PlayingCardProps> = ({ suit, rank, visible = true }) => {
  const imagePath = `${import.meta.env.BASE_URL}images/cards/${suit}_${rank}.svg`;
  
  return (
    <div className={`playing-card ${visible ? 'card-visible' : 'card-hidden'}`}>
      {visible && (
        <img 
          src={imagePath} 
          alt={`${rank} of ${suit}`} 
        />
      )}
    </div>
  );
};

export default PlayingCard;
