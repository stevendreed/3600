import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../../utils/apolloQL';
import Auth from '../../utils/auth';

const UserSidebar = () => {
    const isLoggedIn = Auth.loggedIn();
  
    const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
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
  // once that mutation is complete, it should validate through resolvers.js and return an auth item ->
  // <- which is then passed through the front end authenticator's Auth.login (not to be confused with login) function ->
  // <- WHICH should sign the token data and set the user's current state to logged in, adding 'user' to context for resolvers
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...loginFormState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setLoginFormState({
      username: '',
      password: '',
    });
  };

  // same deal here, but we are passing ADD_USER instead of LOGIN_USER, as ADD_USER is assigned to the signup function
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...signupFormState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setSignupFormState({
      email: '',
      username: '',
      password: '',
    });
  };

  const handleLogout = () => {
    Auth.logout();
  };

return (
  <div className="sidebar">

  {isLoggedIn ? (
    <div className='user-profile'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className='login-signup-forms'>
      <form className='login-form' onSubmit={handleLoginSubmit}>
        <h3>Login</h3>
          <input
          className="login-form-input"
          placeholder="Username"
          name="username"
          type="username"
          value={loginFormState.username}
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
          type="submit">
            Submit
          </button>
        </form>
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
            type="submit">
            Submit
            </button>
          </form>
    </div>
  )}

  {/* if we are in a Chatroom or in the CreateRoom menu, the donate and createroom buttons will not load on mobile */}
  {window.location.pathname.indexOf("Chatroom") == true || window.location.pathname.indexOf("CreateRoom") == true ? (
    <div></div>
  ) : (
    <div className='mobileButtons'>
      <a className='donateButton'>DONATE</a>
      <a className='createRoomButton' href='/CreateRoom'>CREATE ROOM</a>
    </div>
  )}

  <div className='sidebarMainContainer'>
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
    <a className='createRoomButton' href='/CreateRoom'>CREATE NEW ROOM</a>
    <a className='donateButton'>DONATE</a>
    </div>
</div>
  )
}

export default UserSidebar;