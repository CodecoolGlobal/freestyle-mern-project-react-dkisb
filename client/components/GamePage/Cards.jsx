import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

async function patchUser(id, update) {
  const response = await fetch(`/api/user/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  const updatedUser = await response.json();
  return updatedUser;
}

function Cards({
  playerBalance,
  dealerBalance,
  numberOfCards,
  yourHand,
  dealerHand,
  upperCard,
  yourHandData,
  dealerHandData,
  onSetYourValue,
  yourHandValue,
  dealerHandValue,
  onSetDealerValue,
  stopClicked,
  enoughClicked,
  onSetWinner,
  setGameOver,
  onGameOver,
  gameStarted,
  user,
  winner,
  onLoggedIn,
  onRightLogin,
  onSuccessfulRegister,
  onActiveUser,
}) {
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandIds, setYourHandIds] = useState(yourHand);
  const [outcomeMessage, setOutcomeMessage] = useState('');
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();
  function yourHandMapping() {
    yourHandValue === 20 || yourHandValue === 21;
    const handImages = yourHandData.map((item, index) => {
      return <img key={index} src={`http://localhost:3000${item.frontImage}`} alt="" />;
    });
    return handImages;
  }
  function dealerHandMapping() {
    const handImages = dealerHandData.map((item, index) => {
      if (!enoughClicked && (dealerHandValue < 22 || (dealerHandValue === 22 && dealerHand.length === 2))) {
        return <img className="card-backside" key={`dealer-${index}`} src={`http://localhost:3000${item.backImage}`} />;
      } else if (enoughClicked || (dealerHandValue > 21 && dealerHand.length > 2)) {
        return <img key={`dealer-${index}`} src={`http://localhost:3000${item.frontImage}`} />;
      }
    });
    return handImages;
  }
  useEffect(() => {
    if (upperCard && !stopClicked) {
      onSetYourValue(yourHandValue + upperCard.value);
    } else if (upperCard && stopClicked) {
      onSetDealerValue(dealerHandValue + upperCard.value);
    }
  }, [upperCard]);

  useEffect(() => {
    if (dealerHandValue >= 22 && dealerHand.length > 2) {
      onSetWinner('player');
      setGameOver(true);
      setOutcomeMessage('Congratulation, you won!');
    } else if (enoughClicked && dealerHandValue === 22 && dealerHand.length === 2) {
      onSetWinner('dealer');
      setGameOver(true);
      setOutcomeMessage('FIRE! Sorry, you lost!');
    } else if (enoughClicked && dealerHandValue >= yourHandValue && dealerHandValue < 22) {
      onSetWinner('dealer');
      setGameOver(true);
      setOutcomeMessage('Sorry, you lost!');
    } else if (enoughClicked && dealerHandValue < yourHandValue) {
      onSetWinner('player');
      setGameOver(true);
      setOutcomeMessage('Congratulation, you won!');
    } else if (yourHandValue >= 22 && yourHand.length > 2) {
      onSetWinner('dealer');
      setGameOver(true);
      setOutcomeMessage('Sorry, you lost!');
    } else if (yourHandValue === 22 && yourHand.length === 2) {
      onSetWinner('player');
      setGameOver(true);
      setOutcomeMessage('FIRE! Congratulation, you won!');
    }
  }, [
    dealerHandValue,
    dealerHand.length,
    enoughClicked,
    yourHandValue,
    yourHand.length,
    onSetWinner,
    setGameOver,
    onGameOver,
    gameStarted,
    userData,
  ]);

  async function handleNewGame() {
    setGameOver(true);
    gameStarted(false);
    await patchUser(userData._id, {
      Balance: playerBalance,
      Games: userData.Games + 1,
      ...(winner === 'player' ? { Win: userData.Win + 1 } : { Loss: userData.Loss + 1 }),
    });
    navigate('/startpage');
  }

  function handleQuit() {
    setGameOver(true);
    gameStarted(false);
    onLoggedIn(false);
    onSuccessfulRegister(false);
    onActiveUser(null);
    navigate('/');
  }

  return (
    <div>
      {!onGameOver ? (
        <div>
          <div className="dealers-hand">
            {dealerHandMapping()}
            <p>
              <strong>Dealer</strong>
            </p>
            {(enoughClicked || (dealerHandValue > 21 && dealerHand.length > 2)) && (
              <p>
                <strong>Value: {dealerHandValue}</strong>
              </p>
            )}
          </div>
          <div className="players-hand">
            {yourHandMapping()}
            <p>
              <strong>{user.Username}</strong>
            </p>
            <p>
              <strong>Value: {yourHandValue}</strong>
            </p>
          </div>
          <div className="card-stack">
            <img src={`http://localhost:3000/Back.jpg`} alt="backside of the cards" />
            <p>Card Stack ({numberOfCards} remaining)</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="dealers-hand">
            {dealerHandMapping()}
            <p>
              <strong>Hand of the dealer</strong>
            </p>
            {(enoughClicked || (dealerHandValue > 21 && dealerHand.length > 2)) && (
              <p>
                <strong>Value: {dealerHandValue}</strong>
              </p>
            )}
          </div>
          <div className="endGameNavBTNs">
            <h1>{outcomeMessage}</h1>
            <Link to="/startpage" state={{ ...userData, Balance: playerBalance, dealerBalance: dealerBalance }}>
              <button onClick={handleNewGame}>New Game</button>
            </Link>
            <button onClick={handleQuit}>Quit and Logout</button>
          </div>
          <div className="players-hand">
            {yourHandMapping()}
            <p>
              <strong>{user.Username}</strong>
            </p>
            <p>
              <strong>Value: {yourHandValue}</strong>
            </p>
          </div>
          <div className="card-stack">
            <img src={`http://localhost:3000/Back.jpg`} alt="backside of the cards" />
            <p>
              <strong>Card Stack ({numberOfCards} remaining) </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
