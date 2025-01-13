import { useState, useEffect } from "react";

function Cards({card, playerBalance, onPlayerBalance, dealerBalance, onDealerBalance, totalBet, onTotalBet, numberOfCards, yourHand, dealerHand, upperCard, yourHandData, dealerHandData, onSetYourValue, yourHandValue, dealerHandValue, onSetDealerValue, stopClicked, enoughClicked, onSetWinner}) {
  //console.log(upperCard);
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandIds, setYourHandIds] = useState(yourHand);
  function yourHandMapping() {
    const handImages = yourHandData.map((item, index) => {
      return <img key={index} src={`http://localhost:3000${item.frontImage}`} width="60px" alt="" />
    })
    return handImages;
  }
  function dealerHandMapping() {
    const handImages = dealerHandData.map((item, index) => {
      if (!enoughClicked && ((dealerHandValue < 22) || (dealerHandValue === 22 && dealerHand.length === 2))) {
        return <img key={`dealer-${index}`} src={`http://localhost:3000${item.backImage}`} width="100px" alt="" />
      } else if (enoughClicked || (dealerHandValue > 21 && dealerHand.length > 2)) {
        return <img key={`dealer-${index}`} src={`http://localhost:3000${item.frontImage}`} width="60px" alt="" />
      }
    })
    return handImages;
  }
  useEffect(() => {
    if (upperCard && !stopClicked) {
      onSetYourValue(yourHandValue + upperCard.value)
    } else if (upperCard && stopClicked) {
      onSetDealerValue(dealerHandValue + upperCard.value)
    }
  }, [upperCard]);
  
  return (
    <div>
      <div className="dealers-hand">
        {dealerHandMapping()}
        {/* <img src="https://www.pngall.com/wp-content/uploads/4/Fanned-Playing-Card-PNG-Pic.png" width="150px" alt="" /> */}
        <p>Hand of the dealer</p>
        {(enoughClicked || (dealerHandValue > 21 && dealerHand.length > 2)) && <p>Value: {dealerHandValue}</p>}
        {(dealerHandValue >= 22 && dealerHand.length > 2) && <h2>Congratulation, you won!</h2>}
        {(enoughClicked && dealerHandValue === 22 && dealerHand.length === 2) && <h2>FIRE! Sorry, you lost!</h2>}
        {(enoughClicked && dealerHandValue >= yourHandValue && dealerHandValue < 22) && <h2>Sorry, you lost!</h2>}
        {(enoughClicked && dealerHandValue < yourHandValue) && <h2>Congratulation, you won!</h2>}
      </div>
      <div className="players-hand">
        {yourHandMapping()}
        <p>Your hand</p>
        <p>Value: {yourHandValue}</p>
        {(yourHandValue >= 22 && yourHand.length > 2) && <h2>Sorry, you lost!</h2>}
        {(yourHandValue === 22 && yourHand.length === 2) && <h2>FIRE! Congratulation, you won!</h2>}
      </div>
      <div className="card-stack">
        <img src={`http://localhost:3000/Back.jpg`} width="150px" alt="" />
        <p>Card Stack ({numberOfCards} remaining)</p>
      </div>
    </div>
  );
}

export default Cards;