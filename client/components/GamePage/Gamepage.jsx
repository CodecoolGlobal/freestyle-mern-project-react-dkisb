import './Gamepage.css';
import DisplayBalances from './DisplayBalances';
import Cards from './Cards';
import DisplayButtons from './DisplayButtons';

function Gamepage() {
  return (
    <div>
      <DisplayBalances />
      <Cards />
      <DisplayButtons />
    </div>
  );
}

export default Gamepage;
