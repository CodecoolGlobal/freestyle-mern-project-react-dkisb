import './App.css';
import StartPage from './components/StartPage/Startpage.jsx';
import {useState, useEffect} from 'react';

function App() {
  const [card, setCard] = useState(null);
  async function handleClick() {
    const response = await fetch('/api/cards');
    const cardIds = await response.json();
    console.log(cardIds)
    const cardId = cardIds[0]
    const response2 = await fetch(`/api/cards/${cardId}`);
    const cardData = await response2.json();
    setCard(cardData);
    
  }
  return (
    <div className="general-div">
      <h2>21 The Card Game</h2>
      <StartPage />
      <div>
        <button onClick={handleClick}>Show card</button>
        {card && <><h2>{card.color} {card.name}</h2><img src={`http://localhost:3000${card.frontImage}`}></img></>}
      </div>
    </div>
  );
}

export default App;
