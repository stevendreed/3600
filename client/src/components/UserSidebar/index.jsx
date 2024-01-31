import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER, ADD_USER, GET_USER } from '../../utils/apolloQL';
import AuthService from '../../utils/auth';

import UserProfile from '../UserProfile/index.jsx';

const UserSidebar = () => {
    const isLoggedIn = AuthService.loggedIn();
    const [userData, setUserData] = useState(null);

    useQuery(GET_USER, {
      variables: { id: isLoggedIn ? AuthService.getProfile()._id : null },
      onCompleted: (data) => {
          setUserData(data.user); 
      },
      skip: !isLoggedIn, 
      });
    const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
  
    const [login, { error: loginError }] = useMutation(LOGIN_USER);
    const [addUser, { error: signupError }] = useMutation(ADD_USER);
  
    const handleLoginChange = (event) => {
      const { name, value } = event.target;
  
      setLoginFormState({
        ...loginFormState,
        [name]: value,
      });
    };
  
  // because we are using 2 different states for each form, we need 2 different change handlers
  // 1 change handler for login and 1 change handler for signup
  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  // ---------
  // submit handlers - similar to change handlers, we need 1 for each form
  // these are attached to their appropriate form tags as a 'onSubmit' effect

  // call our LOGIN_USER mutation (assigned as 'login' on line 22) passing the contents of the ->
  // <- loginFormState as variables (username, password)
  // once that mutation is complete, it should validate through resolvers.js and return an AuthService item ->
  // <- which is then passed through the front end authenticator's Auth.login (not to be confused with login) function ->
  // <- WHICH should sign the token data and set the user's current state to logged in, adding 'user' to context for resolvers
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email: loginFormState.email,
          password: loginFormState.password
        }
      });
  
      console.log("Login Token:", data.LOGIN_USER.token);
      AuthService.login(data.LOGIN_USER.token);
    } catch (e) {
      console.error("Login Error:", e);
    }
  
    setLoginFormState({
      email: '',
      password: '',
    })
  };

  // same deal here, but we are passing ADD_USER instead of LOGIN_USER, as ADD_USER is assigned to the signup function
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await addUser({
        variables: {
          username: signupFormState.username,
          email: signupFormState.email,
          password: signupFormState.password
        },
      });
  
      console.log("Signup Token:", data.addUser.token);
      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error("Signup Error:", e);
    }
  
    setSignupFormState({
      email: '',
      username: '',
      password: '',
    });
  };

    
    // what we want to render
    return (
      <div className="sidebar">
            
      {/* if we are in a Chatroom or in the CreateRoom menu, the donate and createroom buttons will not load on mobile */}
      {window.location.pathname.indexOf("Chatroom") == true || window.location.pathname.indexOf("CreateRoom") == true ? (
        
          <div></div>
          ) : (
      <div className='mobileButtons'>
          <a className='donateButton'>DONATE</a>
          <Link className='createRoomButton' to='/CreateRoom'>CREATE ROOM</Link>
      </div>
          )}

      <div className='sidebarMainContainer'>
      {isLoggedIn ? (
        <div className='user-profile'>
          <UserProfile userData={userData} />
            <button onClick={() => AuthService.logout()}>Logout</button>
        </div>
        ) : (
        <div className='login-signup-forumsContainer'>

        {/* login form */}
        <form className='login-form' onSubmit={handleLoginSubmit}>
        <h3>Login</h3>
            <input
            className="login-form-input"
            placeholder="Email"
            name="email"
            type="email"
            value={loginFormState.email}
            onChange={handleLoginChange}
            />
            <input
            className="login-form-input"
            placeholder="Password"
            name="password"
            type="password"
            value={loginFormState.password}
            onChange={handleLoginChange}
            />
            <button
            className="submitButton"
            style={{ cursor: 'pointer' }}
            type="submit"
            >
            Submit
            </button>
        </form>

        {/* signup form */}
        <form className='signup-form' onSubmit={handleSignupSubmit}>
        <h3>Sign Up</h3>
            <input
            className="signup-form-input"
            placeholder="Email"
            name="email"
            type="email"
            value={signupFormState.email}
            onChange={handleSignupChange}
            />
            <input
            className="signup-form-input"
            placeholder="Username"
            name="username"
            type="username"
            value={signupFormState.username}
            onChange={handleSignupChange}
            />
            <input
            className="signup-form-input"
            placeholder="Password"
            name="password"
            type="password"
            value={signupFormState.password}
            onChange={handleSignupChange}
            />
            <button
            className="submitButton"
            style={{ cursor: 'pointer' }}
            type="submit"
            >
            Submit
            </button>
        </form>

      </div>
      )}

      {/* Error messages, need to be included between forum submissions */}
      {loginError && (
        <div className="my-3 p-3 bg-danger text-white">
          {loginError.message}
        </div>
      )}

      {signupError && (
        <div className="my-3 p-3 bg-danger text-white">
          {signupError.message}
        </div>
      )}  

      </div>
      <div className='sidebarButtonContainer'>
          <Link className='createRoomButton' to='/CreateRoom'>CREATE NEW ROOM</Link>
          <a className='donateButton'>DONATE</a>
      </div>
  </div>
)

}

export default UserSidebar