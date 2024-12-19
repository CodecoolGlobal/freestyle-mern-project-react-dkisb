import { useState } from 'react';

function handleH2PClick() {
  window.open('https://hu.wikipedia.org/wiki/Huszonegy');
}


function DisplayButtons({onHandleMore, onHandleAiMore, yourHandValue, onHandleStop, dealerHandValue, stopClicked, onBet, onSetDealer, onSetPlayer, dealerMax, playerMax, currentTotal}) {
  return (
    <div>
      <div className="game-focused-buttons">
        {yourHandValue < 20 && <button onClick={onHandleMore}>More</button>}

        <button onClick={handleRaiseBetClick}>Raise bet</button>

        {yourHandValue >= 15 && <button onClick={onHandleStop}>Enough</button>}

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
      {(stopClicked && dealerHandValue < 15) &&
      <div className="ai-more-button">
        <button onClick={onHandleAiMore}>More</button>
      </div>}
      {(stopClicked && dealerHandValue >= 15 && dealerHandValue <= 21) &&
      <div className="ai-enough-button">
        <button>Enough</button>
      </div>}

    </div>
  );
}

export default DisplayButtons;
