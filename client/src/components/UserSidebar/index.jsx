// Usersidebar will appear on all routes, and will be used for user logins
// it will either display a login forum or user information in a ternary depending on if
// the state is set to logged in or not

// useState is used to take forum information
import { useState } from 'react';
// useMutation is required on the front end to perform a mutation
import { useMutation } from '@apollo/client';

// We need mutations for logging in and adding users, here is an example of how it would be written:
// import { LOGIN_USER } from '../utils/mutations';
// import { ADD_USER } from '../utils/mutations';

// function to export our sidebar content to Outlet in App.jsx based on url defined in Main.jsx
const UserSidebar = () => {

    // declaration for login and signup forms (when user not logged in)
    // mutations need to be finished on the backend for front end implementation
    const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
    // const [login, { loginError, loginData }] = useMutation(LOGIN_USER);

    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
    // const [signup, { signupError, signupData }] = useMutation(ADD_USER);

    // handler for login form, will update state whenever the forum changes
    const handleLoginChange = (event) => {
        const { name, value } = event.target;
    
        setLoginFormState({
          ...loginFormState,
          [name]: value,
        });
      };

    // because we are using 2 different states for each form, we need 2 different handlers
    // 1 state handler for login and 1 state handler for signup
    const handleSignupChange = (event) => {
        const { name, value } = event.target;

        setSignupFormState({
            ...signupFormState,
            [name]: value,
        });
        };

    // what we want to render
    return (
        <div className="sidebar">
            <h1>Sidebar Placeholder</h1>
        </div>
    )
    
    }
    
    export default UserSidebar