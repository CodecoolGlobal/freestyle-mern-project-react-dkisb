import './StartPage.css';
import { useState, useEffect } from 'react';
import Gamepage from '../GamePage/Gamepage';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

async function patchUserData(id, update) {
  const response = await fetch(`/api/user/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(update),
  });
  const updatedUser = await response.json();
  return updatedUser;
}

function StartPage({ user }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [card, setCard] = useState(null);
  const [randomCardIds, setRandomCardIds] = useState(null);
  const [userData, setUserData] = useState(user);
  const [dealerBalance, setDealerBalance] = useState(100);
  const location = useLocation();
  useEffect(() => {
    const loggedInUser = location.state;
    if (loggedInUser) {
      setUserData(loggedInUser);
      setDealerBalance(loggedInUser.dealerBalance);
    }
  }, [location.state]);

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
  function handleHelpClick() {
    window.open('https://hu.wikipedia.org/wiki/Huszonegyes');
  }

  return (
    <>
      {gameStarted && randomCardIds ? (
        <Gamepage
          randomCards={randomCardIds}
          gameStarted={setGameStarted}
          user={userData}
          onUser={setUserData}
          dealerMoney={dealerBalance}
        />
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
              <button onClick={handleHelpClick}>Rules</button>
              <Link to={'/account'} state={userData}>
                <button>Account</button>
              </Link>
              <button onClick={handleHelpClick}>Help</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StartPage;
