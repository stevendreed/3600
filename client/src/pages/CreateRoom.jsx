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
            icon: '',
            });
    };

    // allows users to select images for room creation
    const imageclick = () => {
      setCreateRoomFormState({
        ...createRoomState,
        icon: event.target.name,
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
                            disabled
                            className="createRoom-form-input"
                            placeholder="Pick an Icon"
                            name="image"
                            type="icon"
                            value={createRoomState.icon}
                            onChange={handleCreateRoomChange}
                            />
                            <div className='imageChoice-container'>
                              {/* images user can select, attach function onclick set createRoomState.image to the url */}
                              <img className='imageChoice' src='/images/person1.svg' name='person1.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/person2.svg' name='person2.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/person3.svg' name='person3.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/person4.svg' name='person4.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/person5.svg' name='person5.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/person6.svg' name='person6.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/dog.svg' name='dog.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/cat.svg' name='cat.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/gator.svg' name='gator.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/robot.svg' name='robot.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/painting.svg' name='painting.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/guitar.svg' name='guitar.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/gaming.svg' name='gaming.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/sports.svg' name='sports.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/book.svg' name='book.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/buildings.svg' name='buildings.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/clock.svg' name='clock.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/foodcombo.svg' name='foodcombo.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/pizza.svg' name='pizza.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/burger.svg' name='burger.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/flowers.svg' name='flowers.svg' onClick={() => imageclick()}></img>
                              <img className='imageChoice' src='/images/diamonds.svg' name='diamonds.svg' onClick={() => imageclick()}></img>
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