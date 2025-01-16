import { useState } from 'react';

function handleH2PClick() {
  window.open('https://hu.wikipedia.org/wiki/Huszonegyes');
}

function DisplayButtons({
  onHandleMore,
  onHandleAiMore,
  yourHandValue,
  dealerHandValue,
  dealerHand,
  onHandleStop,
  stopClicked,
  enoughClicked,
  onSetEnoughClicked,
  onBet,
  onSetDealer,
  onSetPlayer,
  dealerMax,
  playerMax,
  currentTotal,
  betSubmitClicked,
  onSubmitClicked
}) {
  const [showBetInput, setShowBetInput] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  
  let maxBalance = playerMax;

  const handleRaiseBetClick = () => {
    setShowBetInput(true);
  };

  function handleChange(event) {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value <= maxBalance) {
      setBetAmount(value);
    } else if (value > maxBalance) {
      alert(`You cannot bet more than ${maxBalance}$`);
    }
  }

  const handlePlaceBet = (e) => {
    e.preventDefault();
    if (betAmount > 0) {
      setShowBetInput(false);
      setBetAmount(0);
      onBet(currentTotal + betAmount * 2);
      onSetDealer(dealerMax - betAmount);
      onSetPlayer(playerMax - betAmount);
      onSubmitClicked(true)
    } else {
      alert('Please enter a valid bet amount.');
    }
  };

  return (
    <div>
      <div className="game-focused-buttons">
        {(yourHandValue < 20 && !stopClicked) && <button onClick={onHandleMore}>More</button>}
        {yourHandValue < 20 && !stopClicked && <button onClick={handleRaiseBetClick}>Raise bet</button>}
        {yourHandValue >= 15 && yourHandValue < 22 && !stopClicked && !(yourHandValue === 22 && yourHandValue.length === 2) && !betSubmitClicked && <button onClick={onHandleStop}>Enough</button>}
      </div>
      {showBetInput && (
        <div className="bet-input">
          <form onSubmit={handlePlaceBet}>
            <input type="text" placeholder="Enter your bet" value={betAmount} onChange={handleChange} max={maxBalance} />
            <button>Place Bet</button>
          </form>

        </div>
      )}
      <div className="help-button">
        <button onClick={handleH2PClick}>How to play</button>
      </div>
      {(stopClicked && dealerHandValue < 15) && (
        <div className="ai-more-button">
          <button onClick={onHandleAiMore}>More</button>
        </div>
      )}
      {stopClicked &&
        ((dealerHandValue >= 15 && dealerHandValue <= 21) || (dealerHandValue === 22 && dealerHand.length === 2)) && (
          <div className="ai-enough-button">
            {!enoughClicked && <button onClick={() => onSetEnoughClicked(true)}>Enough</button>}
          </div>
        )}
    </div>
  );
}

export default DisplayButtons;
