import React, { useState, useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios';
import './SignIn.css';
import { AppStateContext } from '../../AppContext';

const SignUp = (props) => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    // eslint-disable-next-line
    const [redirectTo, setRedirectTo] = useState("")

    const context = useContext(AppStateContext)

    const handleLogin = event => {
        event.preventDefault();
        axios
            .post("/api/user/login", {
                username: user,
                password: password
            })
            .then(response => {
              context.updateUser();
              if(props.location.pathname === '/sign-in') {
                setRedirectTo('/')
              }
            }).catch(error => {
                console.log("login error: SignIn Component")
                console.log(error)
            })

    }

    if (redirectTo) {
        return <Redirect to={{ pathname: redirectTo }} />
    } else {
        return (
          <div className="container signIn">
            <div className="row">
              <form className="col s12">
                <h3>Welcome, back!</h3>
                <h5>Enter your username and password</h5>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="usernameLogin"
                      name="username"
                      type="text"
                      className="validate"
                      value={user}
                      onChange={event => setUser(event.target.value)}
                    />
                    <label
                      htmlFor="username"
                      className="black-text bold active"
                    >
                      Username
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="passwordLogin"
                      type="password"
                      name="password"
                      className="validate"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="black-text bold active"
                    >
                      Password
                    </label>
                  </div>
                </div>
                <input
                  className="btn btnSignIn"
                  style={{ fontFamily: "Grenze" }}
                  type="submit"
                  onClick={handleLogin}
                />
              </form>
            </div>
          </div>
        );
    }
}

export default withRouter(SignUp);