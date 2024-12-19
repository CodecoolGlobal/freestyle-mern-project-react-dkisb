import './StartPage.css';
import { useState } from 'react';
import Gamepage from '../GamePage/GamePage';

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [card, setCard] = useState(null);
  const [randomCardIds, setRandomCardIds] = useState(null);

  async function handleClick() {
    const response = await fetch('/api/cards');
    const cardIds = await response.json();
    setRandomCardIds(cardIds);
    const cardId = cardIds[0];
    const response2 = await fetch(`/api/cards/${cardId}`);
    const cardData = await response2.json();
    setCard(cardData);
    setGameStarted(true);
  }

  return (
    <>
      {gameStarted && randomCardIds ? (
        <Gamepage randomCards={randomCardIds} />
      ) : (
        <>
          <div className="start-header">
            <h2>21 The Card Game</h2>
          </div>
          <div className="start-page">
            <button onClick={handleClick} className="start-button">
              Start Game
            </button>
            <div className="bottom-buttons">
              <button>Rules</button>
              <button>My Stats</button>
              <button>Help</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StartPage;
