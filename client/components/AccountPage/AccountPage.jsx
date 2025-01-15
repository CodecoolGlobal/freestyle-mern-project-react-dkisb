import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = location.state;
  const [currentUserData, setCurrentUserData] = useState(currentUser);

  function toHome() {
    navigate('/startpage');
  }

  return (
    <div>
      <h1>Account statistics</h1>
      <p>Name: {currentUser.Username}</p>
      <p>Played Games: {currentUser.Games} </p>
      <p>Won Games: {currentUser.Win}</p>
      <p>Current Balance: {currentUser.Balance}</p>
      <p>
        Lost Games: ({currentUser.Games}-{currentUser.Win})
      </p>
      <div className="user-buttons">
        <Link to={`/update/${location.state._id}`} state={currentUserData}>
          <button>Update User</button>
        </Link>
        <button onClick={toHome}>Back to main page</button>
      </div>
    </div>
  );
}

export default AccountPage;
