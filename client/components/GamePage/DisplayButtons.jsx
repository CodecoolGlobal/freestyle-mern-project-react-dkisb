import { useState } from 'react';

function handleH2PClick() {
  window.open('https://hu.wikipedia.org/wiki/Huszonegy');
}


function DisplayButtons({onHandleMore, yourHandValue, onHandleStop}) {
  return (
    <div>
      <div className="game-focused-buttons">
        {yourHandValue < 20 && <button onClick={onHandleMore}>More</button>}
        
        <button>Raise bet</button>
        {yourHandValue >= 15 && <button onClick={onHandleStop}>Stop</button>}
      </div>
      <div className="help-button">
        <button onClick={handleH2PClick}>How to play</button>
      </div>
    </div>
  );
}

export default DisplayButtons;
