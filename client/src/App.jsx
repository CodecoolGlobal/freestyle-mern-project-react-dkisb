import './App.css';
import StartPage from '../components/StartPage/StartPage';
import { useState, useEffect } from 'react';

function App() {
  //const [shuffleCards, setShuffledCards] = useState(null);
  // async function handleClick() {
  //   const response = await fetch('/api/cards');
  //   const cardIds = await response.json();
  //   setShuffledCards (cardIds);
  // }
  return (
    <div className="general-div">
      <StartPage/>
    </div>
  );
}

export default App;
