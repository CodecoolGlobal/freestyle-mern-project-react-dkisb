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
          <div className="user-page">
            <h1 className="game-name">Welcome to the 21 card game!</h1>
            <div>
              <div className="error-message">
                {!rightLogin && <h2>Wrong username or password. Please try again!</h2>}
              </div>
              {!registerClicked && (
                <div className="login-form">
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
                  <div className="register-user">
                    <h4 className="register-new">Don&apos;t have an account yet?</h4>
                    <button onClick={handleRegister}>Register</button>
                  </div>
                </div>
              )}
            </div>

            {registerClicked && existedUser && (
              <div className="error-message">
                <h2>This user already exists. Try a new name! </h2>
              </div>
            )}
            <div className="registration-form">
              {registerClicked && !successfulRegister && (
                <form onSubmit={handleRegistration}>
                  <h2>Register to our site</h2>
                  <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username" />
                  <br />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                  />
                  <br />
                  <button type="submit">Register</button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div>
            {successfulRegister && (
              <StartPage
                user={activeUser}
                onLoggedIn={setIsLoggedIn}
                onSuccessfulRegister={setSuccessfulRegister}
                onActiveUser={setActiveUser}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default LoginPage;
