function DisplayBalances({ dealerMax, playerMax, currentTotal }) {
  return (
    <div>
      <div className="dealers-balance">
        <img src="http://localhost:3000/pokerchips.jpeg" width="125px" alt="" />
        <p>
          <strong>Balance of the dealer: {dealerMax}$</strong>
        </p>
      </div>
      <div className="total-bet">
        <img src="http://localhost:3000/totalchips.png" width="125px" />
        <p>
          <strong>Total: {currentTotal}$</strong>
        </p>
      </div>
      <div className="players-balance">
        <img src="http://localhost:3000/pokerchips.jpeg" width="125px" alt="" />
        <p>
          <strong>Your Balance: {playerMax}$</strong>
        </p>
      </div>
    </div>
  );
}

export default DisplayBalances;
