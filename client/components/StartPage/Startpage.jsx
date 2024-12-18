import './Startpage.css';
import DisplayGamePage from '../Gamepage/Gamepage';
import { useState } from 'react';

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleClick() {
    setGameStarted(true);
  }

  return (
    <>
      {gameStarted ? (
        <DisplayGamePage />
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
