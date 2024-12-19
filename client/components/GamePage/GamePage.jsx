import './GamePage.css';
import DisplayBalances from './DisplayBalances';
import Cards from './Cards';
import DisplayButtons from './DisplayButtons';
import { useState, useEffect } from 'react';

function Gamepage({randomCards}) {
  const [yourHand, setYourHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [randomCardIds, setRandomCardIds] = useState(randomCards);
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandData, setYourHandData] = useState([]);
  const [dealerHandData, setDealerHandData] = useState([]);
  const [yourHandValue, setYourHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [stopClicked, setStopClicked] = useState(false)
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
  // useEffect(() => {
  //   if (upperCardData && stopClicked && dealerHandValue < 15) {
  //     setDealerHandValue(dealerHandValue + upperCardData.value);
  //     console.log(dealerHandValue)
  //   } //else if (upperCard && stopClicked) {
  //     //onSetDealerValue(dealerHandValue + upperCard.value)
  //   //}
  // }, [upperCardData]);

  return (
    <div>
      <DisplayBalances />
      <Cards yourHandValue={yourHandValue} dealerHandValue={dealerHandValue} stopClicked={stopClicked} onSetYourValue={setYourHandValue} onSetDealerValue={setDealerHandValue} card={randomCardIds[0]} upperCard={upperCardData} numberOfCards={randomCardIds.length} yourHand={yourHand} yourHandData={yourHandData} dealerHandData={dealerHandData}/>
      <DisplayButtons dealerHandValue={dealerHandValue} stopClicked={stopClicked} yourHandValue={yourHandValue} onHandleStop={handleStop} onHandleMore={handleMore} onHandleAiMore={handleAiMore}/>
    </div>
  );
}

export default Gamepage;
