import './Startpage.css';
import Gamepage from '../GamePage/Gamepage';
import { useState } from 'react';

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [card, setCard] = useState(null);

  function handleClick() {
    setGameStarted(true);
  }
  async function handleShuffle() {
    const response = await fetch('/api/cards');
    const cardIds = await response.json();
    const cardId = cardIds[0];
    const response2 = await fetch(`/api/cards/${cardId}`);
    const cardData = await response2.json();
    setCard(cardData);
  }

  return (
    <>
      {gameStarted ? (
        <Gamepage />
      ) : (
        <div>
          <h2>21 The Card Game</h2>
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
        </div>
      )}
    </>
  );
}

export default StartPage;
