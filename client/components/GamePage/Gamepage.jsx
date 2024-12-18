import './Gamepage.css';
import DisplayBalances from './Balances';
import DisplayCards from './Cards';
import DisplayButtons from './Userbuttons';

function Gamepage() {
  return (
    <div>
      <DisplayBalances />
      <DisplayCards />
      <DisplayButtons />
    </div>
  );
}

export default Gamepage;
