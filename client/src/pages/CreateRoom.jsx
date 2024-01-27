// will render the CreateRoomForm component

import { useContext, createContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ROOM } from '../../utils/mutations';

const CreateRoom = () => {
    // This is an example of how we run our query through frontend
    // const { loading, data } = useQuery(QUERY_THOUGHTS);

    // if no data is returned, set thoughts to an empty array
    // const thoughts = data?.thoughts || [];

    const [createRoomState, setCreateRoomFormState] = useState({ title: '', tags: [], icon: '' });
    const [createRoom] = useMutation(CREATE_ROOM);

    const handleCreateRoomChange = (event) => {
      const { name, value } = event.target;

      setCreateRoomFormState({
          ...createRoomState,
          [name]: value,
      });
      };

      const handleCreateRoomSubmit = async (event) => {
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
  
    return (
      <div className="createRoom-container">

          <form className='createRoom-form' onSubmit={handleSignupSubmit}>
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
    );
  };
  
  export default CreateRoom;