import React, { useState, useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import dbAPI from "../../utils/dbAPI"
import axios from 'axios';
import "./Sign-up.css";
import { AppStateContext } from '../../AppContext';

const SignUp = (props) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [email, setEmail] = useState("")
  const [redirectTo, setRedirectTo] = useState("")

  const context = useContext(AppStateContext)

  const createUser = (userData) => {
    dbAPI.createUser(userData)
      .then(saved => {
        console.log(saved);
        axios
          .post("/api/user/login", {
            username: user,
            password: password
          })
          .then(response => {
            context.updateUser();
            setUser("")
            setPassword("")
            setConfirmPass("")
            setEmail("")
            if (props.location.pathname === '/sign-up') {
              setRedirectTo('/')
            }
          }).catch(error => {
            console.log("login error: SignIn Component")
            console.log(error)
          })
      })
      .catch(err => console.log(err))
  }

  const handleUserCreation = event => {
    event.preventDefault()
    const userData = {
      username: user,
      password: confirmPass,
      email: email,
      date: Date.now()
    }
    createUser(userData)
  }

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <div className="container signUp">
        <div className="row">
          <form className="col s12" action="/api/user" method="POST">
            <h3>Welcome!</h3>
            <h5>Please set up your account</h5>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="validate white-text"
                  value={user}
                  onChange={event => setUser(event.target.value)}
                />
                <label htmlFor="username" className="black-text bold active">
                  Username
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate white-text"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <label htmlFor="password" className="black-text bold active">
                  Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="passwordConfirm"
                  type="password"
                  name="password2"
                  className="validate white-text"
                  value={confirmPass}
                  onChange={event => setConfirmPass(event.target.value)}
                />
                <label htmlFor="password" className="black-text bold active">
                  Confirm Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate white-text"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="email" className="black-text bold active">
                  Email
                </label>
              </div>
            </div>
            <input
              className="btn btnSignUp"
              style={{ fontFamily: "Grenze" }}
              type="submit"
              onClick={handleUserCreation}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);