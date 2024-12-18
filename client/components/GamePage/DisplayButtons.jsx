import { useState } from 'react';

function handleH2PClick() {
  window.open('https://hu.wikipedia.org/wiki/Huszonegy');
}

function DisplayButtons() {
  return (
    <div>
      <div className="game-focused-buttons">
        <button>More</button>
        <button>Raise bet</button>
        <button>Stop</button>
      </div>
      <div className="help-button">
        <button onClick={handleH2PClick}>How to play</button>
      </div>
    </div>
  );
}

export default DisplayButtons;
