import './Gamepage.css';
import DisplayBalances from './DisplayBalances';
import DisplayCards from './DisplayCards';
import DisplayButtons from './DisplayButtons';

function DisplayGamePage() {
  return (
    <div>
      <DisplayBalances />
      <DisplayCards />
      <DisplayButtons />
    </div>
  );
}

export default DisplayGamePage;
