import './GamePage.css';
import DisplayBalances from './DisplayBalances';
import Cards from './Cards';
import DisplayButtons from './DisplayButtons';
import { useState, useEffect } from 'react';

function Gamepage({ randomCards, gameStarted, user, dealerMoney }) {
  console.log(user)
  const [yourHand, setYourHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [randomCardIds, setRandomCardIds] = useState(randomCards);
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandData, setYourHandData] = useState([]);
  const [dealerHandData, setDealerHandData] = useState([]);
  const [yourHandValue, setYourHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [stopClicked, setStopClicked] = useState(false);
  const [enoughClicked, setEnoughClicked] = useState(false);
  const [dealerBalance, setDealerBalance] = useState(dealerMoney ?? 100);
  const [playerBalance, setPlayerBalance] = useState(user?.Balance ?? 100);
  const [playerWins, setPlayerWins] = useState(user?.Win ?? 0);
  const [playerLosses, setPlayerLosses] = useState(user?.Loss ?? 0);
  const [totalBet, setTotalBet] = useState(0);
  const [winner, setWinner] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  async function handleMore() {
    setYourHand([...yourHand, randomCardIds[0]]);
    randomCardIds.splice(0, 1);
    setRandomCardIds([...randomCardIds]);
    const response = await fetch(`/api/cards/${randomCardIds[0]}`);
    const cardData = await response.json();
    setUpperCardData(cardData);
    setYourHandData([...yourHandData, cardData]);
  }

  async function handleAiMore() {
    setDealerHand([...dealerHand, randomCardIds[0]]);
    randomCardIds.splice(0, 1);
    setRandomCardIds([...randomCardIds]);
    const response = await fetch(`/api/cards/${randomCardIds[0]}`);
    const cardData = await response.json();
    setUpperCardData(cardData);
    setDealerHandData([...dealerHandData, cardData]);
  }

  async function handleStop() {
    setStopClicked(true);
    setDealerHand([...dealerHand, randomCardIds[0]]);
    randomCardIds.splice(0, 1);
    setRandomCardIds([...randomCardIds]);
    const response = await fetch(`/api/cards/${randomCardIds[0]}`);
    const cardData = await response.json();
    setUpperCardData(cardData);
    setDealerHandData([...dealerHandData, cardData]);
  }

  useEffect(() => {
    if (isGameOver) {
      console.log('Game Over');
    }
  }, [isGameOver]);

  useEffect(() => {
    if (winner === 'player') {
      setPlayerBalance(playerBalance + totalBet);
      setTotalBet(0);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (winner === 'dealer') {
      setDealerBalance(dealerBalance + totalBet);
      setTotalBet(0);
    }
  }, [isGameOver]);

  return (
    <div>
      <DisplayBalances dealerMax={dealerBalance} playerMax={playerBalance} currentTotal={totalBet} />
      <Cards
        yourHandValue={yourHandValue}
        dealerHandValue={dealerHandValue}
        stopClicked={stopClicked}
        enoughClicked={enoughClicked}
        onSetYourValue={setYourHandValue}
        onSetDealerValue={setDealerHandValue}
        card={randomCardIds[0]}
        upperCard={upperCardData}
        numberOfCards={randomCardIds.length}
        yourHand={yourHand}
        dealerHand={dealerHand}
        yourHandData={yourHandData}
        dealerHandData={dealerHandData}
        onSetWinner={setWinner}
        playerBalance={playerBalance}
        dealerBalance={dealerBalance}
        totalBet={totalBet}
        onPlayerBalance={setPlayerBalance}
        onDealerBalance={setDealerBalance}
        onTotalBet={setTotalBet}
        setGameOver={setIsGameOver}
        onGameOver={isGameOver}
        gameStarted={gameStarted}
        user={user}
      />
      <DisplayButtons
        dealerHandValue={dealerHandValue}
        dealerHand={dealerHand}
        stopClicked={stopClicked}
        enoughClicked={enoughClicked}
        onSetEnoughClicked={setEnoughClicked}
        yourHandValue={yourHandValue}
        onHandleStop={handleStop}
        onHandleMore={handleMore}
        onHandleAiMore={handleAiMore}
        dealerMax={dealerBalance}
        playerMax={playerBalance}
        currentTotal={totalBet}
        onBet={setTotalBet}
        onSetDealer={setDealerBalance}
        onSetPlayer={setPlayerBalance}
      />
    </div>
  );
}

export default Gamepage;
