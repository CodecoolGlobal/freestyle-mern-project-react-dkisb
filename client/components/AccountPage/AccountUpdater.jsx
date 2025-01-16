import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AccountUpdater.css';

function AccountUpdater() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const accountID = location.state._id;
  const user = location.state;
  const [currentUserData, setCurrentUserData] = useState(user);

  async function handleDelete() {
    try {
      const response = await fetch(`/api/users/${accountID}`, { method: 'DELETE' });
      if (response.ok) {
        navigate('/');
        console.log(`User ${accountID} has been deleted`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${accountID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: name, Password: password }),
      });
      if (response.ok) {
        const updatedAccount = await response.json();
        console.log('Updated Account:', updatedAccount);
        navigate('/startpage');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="updater-container">
      <h1 className="updater-header">Account updater</h1>
      <form className="updater-form" onSubmit={handleSubmit}>
        <div className="name-input">
          <label htmlFor="name" className="updater-label">
            Name
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="pw-input">
          <label htmlFor="password" className="updater-label">
            Password
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Update credentials</button>
      </form>
      <div className="inter-buttons">
        <button onClick={handleDelete}>Delete Account</button>
        <Link to={'/startpage'} state={currentUserData}>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}

export default AccountUpdater;
