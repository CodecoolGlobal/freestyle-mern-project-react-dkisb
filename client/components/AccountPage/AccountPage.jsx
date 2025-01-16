import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const location = useLocation();
  const currentUser = location.state;
  const [currentUserData, setCurrentUserData] = useState(currentUser);
  return (
    <div className="user-account">
      <h1>Account statistics</h1>
      <div className="user-details">
        <p>
          <strong>Name:</strong> {currentUser.Username}
        </p>
        <p>
          <strong>Played Games:</strong> {currentUser.Games}{' '}
        </p>
        <p>
          <strong>Won Games:</strong> {currentUser.Win}
        </p>
        <p>
          <strong>Current Balance:</strong> {currentUser.Balance}
        </p>
        <p>
          <strong>Lost Games:</strong> {currentUser.Loss}
        </p>
      </div>
      <div className="user-buttons">
        <Link to={`/update/${location.state._id}`} state={currentUserData}>
          <button>Update User</button>
        </Link>
        <br />
        <Link to={'/startpage'} state={currentUserData}>
          <button>Back to main page</button>
        </Link>
      </div>
    </div>
  );
}

export default AccountPage;
