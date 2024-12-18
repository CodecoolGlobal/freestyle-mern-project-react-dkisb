function Cards() {
  return (
    <div>
      <div className="dealers-hand">
        <img src="https://www.pngall.com/wp-content/uploads/4/Fanned-Playing-Card-PNG-Pic.png" width="150px" alt="" />
        <p>Hand of the dealer</p>
        <p>Value:</p>
      </div>
      <div className="players-hand">
        <img src="https://www.pngall.com/wp-content/uploads/4/Fanned-Playing-Card-PNG-Pic.png" width="150px" alt="" />
        <p>Your hand</p>
        <p>Value:</p>
      </div>
      <div className="card-stack">
        <img src="https://www.pngall.com/wp-content/uploads/4/Fanned-Playing-Card-PNG-Pic.png" width="150px" alt="" />
        <p>Card Stack</p>
      </div>
    </div>
  );
}

export default Cards;
