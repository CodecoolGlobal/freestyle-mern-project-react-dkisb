import './GamePage.css';
import DisplayBalances from './DisplayBalances';
import Cards from './Cards';
import DisplayButtons from './DisplayButtons';
import { useState } from 'react';

function Gamepage({ randomCards }) {
  const [yourHand, setYourHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [randomCardIds, setRandomCardIds] = useState(randomCards);
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandData, setYourHandData] = useState([]);
  const [dealerHandData, setDealerHandData] = useState([]);
  const [yourHandValue, setYourHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [dealerBalance, setDealerBalance] = useState(100);
  const [playerBalance, setPlayerBalance] = useState(100);
  const [totalBet, setTotalBet] = useState(0);

  async function handleMore() {
    setYourHand([...yourHand, randomCardIds[0]]);
    randomCardIds.splice(0, 1);
    setRandomCardIds([...randomCardIds]);
    const response = await fetch(`/api/cards/${randomCardIds[0]}`);
    const cardData = await response.json();
    setUpperCardData(cardData);
    setYourHandData([...yourHandData, cardData]);
  }

  function handleStop() {
    console.log('Stop button');
  }

  return (
    <div>
      <DisplayBalances dealerMax={dealerBalance} playerMax={playerBalance} currentTotal={totalBet} />

      <Cards
        yourHandValue={yourHandValue}
        onSetValue={setYourHandValue}
        card={randomCardIds[0]}
        upperCard={upperCardData}
        numberOfCards={randomCardIds.length}
        yourHand={yourHand}
        yourHandData={yourHandData}
      />

      <DisplayButtons
        yourHandValue={yourHandValue}
        onHandleStop={handleStop}
        onHandleMore={handleMore}
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
