import './App.css';
import StartPage from '../components/StartPage/StartPage';
import { useState, useEffect } from 'react';
import StartPage from '../components/StartPage/Startpage';

function App() {
  const [shuffledards, setCardsShuffled] = useState(null);
  async function handleClick() {
    const response = await fetch('/api/cards');
    const cardIds = await response.json();
    setCardsShuffled(cardIds);
  }
  return (
    <div className="general-div">
      <StartPage/>
    </div>
  );
}

export default App;
