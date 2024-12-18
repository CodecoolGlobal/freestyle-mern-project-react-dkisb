import './Gamepage.css';
import DisplayBalances from './DisplayBalances';
import DisplayCards from './DisplayCards';
import DisplayButtons from './DisplayButtons';

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
