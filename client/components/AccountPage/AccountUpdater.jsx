import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './AccountUpdater.css';

function AccountUpdater() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const accountID = location.state._id;

  function toHomePage() {
    navigate('/startpage');
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/users/${accountID}`, { method: 'DELETE' });
      if (response.ok) {
        navigate('/startpage');
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
    <div>
      <h1>Account updater</h1>
      <form onSubmit={handleSubmit}>
        <div className="name-input">
          <label htmlFor="name">
            Name
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="pw-input">
          <label htmlFor="password">
            Password
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Update credentials</button>
      </form>
      <button onClick={handleDelete}>Delete Account</button>
      <button onClick={toHomePage}>Cancel</button>
    </div>
  );
}

export default AccountUpdater;
