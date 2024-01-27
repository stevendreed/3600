// will render the CreateRoomForm component

import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ROOM } from '../utils/mutations';
// using a mutation to create our room (CREATE_ROOM is a placeholder)

const CreateRoom = () => {

    // Create a state for room creation
    const [createRoomState, setCreateRoomFormState] = useState({ title: '', tags: [], icon: '' });
    // assign mutation to a const variable
    const [createRoom] = useMutation(CREATE_ROOM);

    // whenever a modification to the form is made, add that change to the state
    const handleCreateRoomChange = (event) => {
      const { name, value } = event.target;

      setCreateRoomFormState({
          ...createRoomState,
          [name]: value,
      });
      };

      // on submit, attempt to fire off CREATE_ROOM mutation using the data from the createRoomState
      const handleCreateRoomSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { createRoomData } = await createRoom({
            variables: { ...createRoomState },
            });
    
        } catch (e) {
            console.error(e);
        }

        // clear form state after mutation
        setCreateRoomFormState({
            title: '',
            tags: [],
            image: '',
            });
    };
  
    return (
      <div className="createRoom-container">

          <form className='createRoom-form' onSubmit={handleCreateRoomSubmit}>
                        <h3>Create Your Room</h3>
                            <input
                            className="createRoom-form-input"
                            placeholder="Room Name"
                            name="title"
                            type="title"
                            value={createRoomState.title}
                            onChange={handleCreateRoomChange}
                            />
                            <input
                            className="createRoom-form-input"
                            placeholder="Room Tags"
                            name="tags"
                            type="tags"
                            value={createRoomState.tags}
                            onChange={handleCreateRoomChange}
                            />
                            <input
                            className="createRoom-form-input"
                            placeholder="Pick an Icon"
                            name="image"
                            type="icon"
                            value={createRoomState.image}
                            onChange={handleCreateRoomChange}
                            />
                            <div className='imageChoice-container'>
                              {/* images user can select, attach function onclick set createRoomState.image to the url */}
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                              <img className='imageChoice' src='/images/profileimgexample.jpg'></img>
                            </div>
                            <button
                            className="roomSubmitButton"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                            >
                            Create Room
                            </button>
                        </form>

      </div>
    );
  };
  
  export default CreateRoom;