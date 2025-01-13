import './GamePage.css';
import DisplayBalances from './DisplayBalances';
import Cards from './Cards';
import DisplayButtons from './DisplayButtons';
import { useState, useEffect } from 'react';

function Gamepage({ randomCards }) {
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
  const [dealerBalance, setDealerBalance] = useState(100);
  const [playerBalance, setPlayerBalance] = useState(100);
  const [totalBet, setTotalBet] = useState(0);
  const [winner, setWinner] = useState(null);

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
    console.log('Stop button');
    setStopClicked(true);
    setDealerHand([...dealerHand, randomCardIds[0]]);
    randomCardIds.splice(0, 1);
    setRandomCardIds([...randomCardIds]);
    const response = await fetch(`/api/cards/${randomCardIds[0]}`);
    const cardData = await response.json();
    setUpperCardData(cardData);
    setDealerHandData([...dealerHandData, cardData]);
  }

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
