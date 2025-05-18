import React from 'react';

interface PlayingCardProps {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';
  visible?: boolean;
}

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
