import './Startpage.css';

function StartPage() {
  return (
    <>
      <div className="start-page">
        <button className="start-button">Start Game</button>
      </div>
      <div className="bottom-buttons">
        <button>Rules</button>
        <button>My Stats</button>
        <button>Help</button>
      </div>
    </>
  );
}

export default StartPage;
