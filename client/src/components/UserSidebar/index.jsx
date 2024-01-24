// Usersidebar will appear on all routes, and will be used for user logins
// it will either display a login forum or user information in a ternary depending on if ->
// <- the state is set to logged in or not

// useState is used to take forum information
import { useState } from 'react';
// useMutation is required on the front end to perform a mutation
import { useMutation } from '@apollo/client';

// mutations needed to make this component work:
import { LOGIN_USER } from '../../utils/mutations';
// logs in a user based on existing database information and returns an auth object (used for jwt token signing)
import { ADD_USER } from '../../utils/mutations';
// adds a user to the database and returns an auth object (used for jwt token signing)
import Auth from '../../utils/auth';
// used for token authentication (what we pass the auth object to)

// function to export our sidebar content to Outlet in App.jsx based on url defined in Main.jsx
const UserSidebar = () => {

    // declaration for login and signup forms (when user not logged in)
    // mutations need to be finished on the backend for front end implementation
    const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
    const [login, { loginError, loginData }] = useMutation(LOGIN_USER);

    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
    const [signup, { signupError, signupData }] = useMutation(ADD_USER);
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
            const { signupData } = await signup({
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
            <div className='sidebarMainContainer'>
                <h1>Sidebar Placeholder</h1>
            </div>
            <div className='sidebarButtonContainer'>
                <button>CREATE NEW ROOM</button>
                <button>DONATE</button>
            </div>
        </div>
    )
    
    }
    
    export default UserSidebar