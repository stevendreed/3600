// Usersidebar component will appear on all routes, and will be used for user logins
// it will either display a login forum or user information in a ternary depending on if ->
// <- the state is set to logged in or not

import { useContext, createContext, useState } from 'react';
// useState is used to take forum information
// useContext and createContext are used for context testing
import { useMutation } from '@apollo/client';
// useMutation is required on the front end to perform a mutation
import { Link } from 'react-router-dom';
// link is used for redirects in react - we use this on this component to allow users to click on their most recent rooms and quickly join back into them

import UserProfile from '../UserProfile/index';
// UserProfile componet is used to render user information when logged in

// mutations needed to make this component work:
import { LOGIN_USER } from '../../utils/mutations';
// logs in a user based on existing database information and returns an auth object (used for jwt token signing)
import { ADD_USER } from '../../utils/mutations';
// adds a user to the database and returns an auth object (used for jwt token signing)
import Auth from '../../utils/auth';
// used for token authentication (what we pass the auth object to)

// function to export our sidebar component to Outlet in App.jsx based on url defined in Main.jsx
const UserSidebar = () => {

    // ************************************************************************************************************
    // FAKE CONTEXT VARIABLE FOR TESTING PURPOSES - set to true to view user info, set to false to view login forms
    // ************************************************************************************************************
    let context = {
        user: true
    }

    // declaration for login and signup forms (when user not logged in)
    // mutations need to be finished on the backend for front end implementation
    const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
    const [login, { loginError, loginData }] = useMutation(LOGIN_USER);

    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { signupError, signupData }] = useMutation(ADD_USER);
    // ---------
    // change handler for login form, will update state whenever the forum changes
    // change handlers are attached to their appropriate input sections as a 'onChange' effect
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
        const { loginData } = await login({
            variables: { ...loginFormState },
        });

        Auth.login(loginData.login.token);
        } catch (e) {
        console.error(e);
        }

        // and then we clear the login form after submit
        setLoginFormState({
        username: '',
        password: '',
        });
    };

    // same deal here, but we are passing ADD_USER instead of LOGIN_USER, as ADD_USER is assigned to the signup function
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { signupData } = await addUser({
            variables: { ...signupFormState },
            });
    
            Auth.login(signupData.addUser.token);
        } catch (e) {
            console.error(e);
        }

        // clear signup form
        setSignupFormState({
            email: '',
            username: '',
            password: '',
            });
    };
    // ---------
    
    // what we want to render
    return (
        <div className="sidebar">

            <div className='mobileButtons'>
                <button className='donateButton'>DONATE</button>
                <button className='createRoomButton'>CREATE ROOM</button>
            </div>

            <div className='sidebarMainContainer'>
                
                {/* IF THE USER CONTEXT EXISTS (meaning the user is logged in) */}
                {/* Render the following: */}
                {context.user ? (
                    <UserProfile />
                ) : (
                // OTHERWISE, render the login/signup forums
                    <div className='login-signup-forumsContainer'>

                        {/* login form */}
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
                <button className='createRoomButton'>CREATE NEW ROOM</button>
                <button className='donateButton'>DONATE</button>
            </div>
        </div>
    )
    
    }
    
    export default UserSidebar