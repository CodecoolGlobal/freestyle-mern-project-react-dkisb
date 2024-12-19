
import { useState, useEffect } from 'react';

function Cards({ card, numberOfCards, yourHand, upperCard, yourHandData, onSetValue, yourHandValue }) {

  console.log(upperCard);
  const [upperCardData, setUpperCardData] = useState(null);
  const [yourHandIds, setYourHandIds] = useState(yourHand);
  function yourHandMapping() {
    const handImages = yourHandData.map((item, index) => {
      return <img key={index} src={`http://localhost:3000${item.frontImage}`} width="85px" alt="" />;
    });

    return handImages;
  }
  useEffect(() => {
    if (upperCard) {
      onSetValue(yourHandValue + upperCard.value);
    }
  }, [upperCard]);

  return (
    <div>
      <div className="dealers-hand">
        <img src="https://www.pngall.com/wp-content/uploads/4/Fanned-Playing-Card-PNG-Pic.png" width="150px" alt="" />
        <p>Hand of the dealer</p>
        <p>Value: </p>
      </div>
      <div className="players-hand">
        {yourHandMapping()}
        <p>Your hand</p>
        <p>Value: {yourHandValue}</p>
        {yourHandValue > 21 && <h2>Sorry, you lost!</h2>}
      </div>
      <div className="card-stack">
        <img src={`http://localhost:3000/Back.jpg`} width="150px" alt="" />
        <p>Card Stack ({numberOfCards} remaining)</p>
      </div>
    </div>
  );
}

export default Cards;
