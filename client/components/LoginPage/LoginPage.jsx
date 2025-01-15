import StartPage from '../StartPage/StartPage';
import { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [existedUser, setExistedUser] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [rightLogin, setRightLogin] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleRegister() {
    setRegisterClicked(true);
  }

  async function postRegistration(user) {
    const response = await fetch('/api/users/registration/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const newUser = await response.json();
    if (newUser === 'The username already exists') {
      setExistedUser(true);
    } else {
      setExistedUser(false);
      setSuccessfulRegister(true);
      setActiveUser(newUser);
    }
  }

  async function postLogin(user) {
    const response = await fetch('/api/users/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const loginUser = await response.json();
    if (loginUser === 'Invalid login') {
      setRightLogin(false);
    } else {
      setRightLogin(true);
      setSuccessfulRegister(true);
      setActiveUser(loginUser);
      setIsLoggedIn(true);
    }
  }

  function handleRegistration(e) {
    e.preventDefault();
    const user = { username: userName, password: password };
    postRegistration(user);
  }

  function handleLogin(e) {
    e.preventDefault();
    const user = { username: userName, password: password };
    postLogin(user);
  }

  return (
    <>
      <div>
        {!successfulRegister ? (
          <div className="heading">
            <h1>Welcome to the 21 card game!</h1>
            <div>
              <div>{!rightLogin && <h2>Wrong username or password. Please try again!</h2>}</div>
              {!registerClicked && (
                <div>
                  <h2>Please log in!</h2>
                  <form onSubmit={handleLogin}>
                    <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username" />
                    <br />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="password"
                      autoComplete="off"
                    />
                    <br />
                    <button type="submit">Login</button>
                  </form>
                  <h4>Don't you have an account yet?</h4>
                  <br />
                  <button onClick={handleRegister}>Register</button>
                </div>
              )}
            </div>

            {registerClicked && existedUser && (
              <div>
                <h2>This user already exists. Try a new name! </h2>
              </div>
            )}
            <div>
              {registerClicked && !successfulRegister && (
                <form onSubmit={handleRegistration}>
                  <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username" />
                  <br />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                  />
                  <br />
                  <button type="submit">Send</button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div>{successfulRegister && <StartPage user={activeUser} />}</div>
        )}
      </div>
    </>
  );
}

export default LoginPage;
