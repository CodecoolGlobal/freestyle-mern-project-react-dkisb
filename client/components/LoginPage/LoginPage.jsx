import StartPage from "../StartPage/StartPage";
import { useState } from "react";



function LoginPage() {
    const [registerClicked, setRegisterClicked] = useState(false);
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [existedUser, setExistedUser] = useState(false);

    function handleRegister() {
        setRegisterClicked(true);
    }

    async function postUserData(user) {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })
        const newUser = await response.json();
        if (newUser === 'The username already exists') {
            setExistedUser(true);
        } else {
            setExistedUser(false);
        }
        //console.log(newUser);
        //return newUser;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const user = {username: userName, password: password};
        postUserData(user);
    }

    return (
        <div>
            <h2>Welcome to the 21 card game!</h2>
            <div>{!registerClicked &&
                <><h2>Please log in!</h2>
                <form>
                    <input type="text" placeholder='username' /><br />
                    <input type="password" placeholder='password' autoComplete="off" /><br />
                    <button type="submit">Login</button>
                </form></>}
            </div>

            <h4>Don't you have an account yet?</h4>
            {!registerClicked &&
                <button onClick={handleRegister}>Register</button>
            }
            <div>
                {registerClicked && existedUser &&
                    <form>
                        <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='username' /><br />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' autoComplete="off" /><br />
                        <button onClick={handleSubmit} type="submit">Send</button>
                    </form>
                }
            </div>
            <div>{existedUser && 
                <h2>This user already exists. Try a new name! </h2>
                }
                
            </div>

        </div>
        
    ) 
}

export default LoginPage;