import { useState } from 'react';

function handleH2PClick() {
  window.open('https://hu.wikipedia.org/wiki/Huszonegy');
}

function DisplayButtons({
  onHandleMore,
  onHandleAiMore,
  yourHandValue,
  dealerHandValue,
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

  const handlePlaceBet = () => {
    if (betAmount > 0) {
      setShowBetInput(false);
      setBetAmount(0);
      onBet(currentTotal + betAmount * 2);
      onSetDealer(dealerMax - betAmount);
      onSetPlayer(playerMax - betAmount);
    } else {
      alert('Please enter a valid bet amount.');
    }
  };

  return (
    <div>
      <div className="game-focused-buttons">
        {(yourHandValue < 20 && !stopClicked) && <button onClick={onHandleMore}>More</button>}
        {!stopClicked && <button onClick={handleRaiseBetClick}>Raise bet</button>}

        {yourHandValue >= 15 && !stopClicked && <button onClick={onHandleStop}>Stop</button>}
      </div>
      {showBetInput && (
        <div className="bet-input">
          <input type="text" placeholder="Enter your bet" value={betAmount} onChange={handleChange} max={maxBalance} />
          <button onClick={handlePlaceBet}>Place Bet</button>
        </div>
      )}
      <div className="help-button">
        <button onClick={handleH2PClick}>How to play</button>
      </div>
      {stopClicked && dealerHandValue < 15 && (
        <div className="ai-more-button">
          <button onClick={onHandleAiMore}>More</button>
        </div>
      )}
      {stopClicked && dealerHandValue >= 15 && dealerHandValue <= 21 && (
        <div className="ai-enough-button">
          {!enoughClicked && <button onClick={() => onSetEnoughClicked(true)}>Enough</button>}
        </div>
      )}
    </div>
  );
}

export default DisplayButtons;
