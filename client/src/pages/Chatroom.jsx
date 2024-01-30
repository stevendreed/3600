// will render the chatroom component
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { QUERY_CHATROOM } from '../utils/queries';
import { CREATE_MESSAGE } from '../utils/mutations';

import RoomCard from '../components/RoomCard'
import ChatroomMessage from '../components/ChatroomMessage'

// PLACEHOLDER DATA TO SIMULATE CHATROOM - replace with chatroom query using useParams to get the chatroom's id

const exampleChatRoom = {
  title: "Exampleroom",
  tags: ["tag1", "tag2"],
  messages: [
    {
      _id: 1,
      username: "ted",
      message: "Hello, my name is ted",
      image: "/images/profileimgexample.jpg",
      timestamp: "111111"
    },
    {
      _id: 2,
      username: "bob",
      message: "AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA",
      image: "/images/profileimgexample.jpg",
      timestamp: "2222222"
    },
    {
      _id: 3,
      username: "ted",
      message: "Wow, that is really uncalled for",
      image: "/images/profileimgexample.jpg",
      timestamp: "33333333"
    },
    {
      _id: 4,
      username: "bob",
      message: "Sorry.",
      image: "/images/profileimgexample.jpg",
      timestamp: "444444444"
    },
  ]
}

const ChatRoom = () => {

  // chatroom's id we are taking from the page's url parameters
  const { id } = useParams();

  // Create a state for your message 
  const [messageState, setMessageFormState] = useState({ message: '' });
  // assign mutation to a const variable
  const [createMessage] = useMutation(CREATE_MESSAGE);

  // whenever a modification to the form is made, add that change to the state
  const handleMessageFormChange = (event) => {
    const { name, value } = event.target;

    setMessageFormState({
        ...messageState,
        [name]: value,
    });
    };

    // on submit, attempt to fire off CREATE_MESSAGE mutation using the data from the messageState
    // we also need to add the user's username from context (once that is working)
    const handleMessageFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
          const { data } = await createMessage({
          variables: { ...messageState },
          });
  
      } catch (e) {
          console.error(e);
      }

      // clear form state after mutation
      setMessageFormState({
          message: ''
          });
  };
  
    return (
      <div className="chatroom-container">
        <div className='messages-container'>
        {exampleChatRoom.messages.map((item) => (
          <ChatroomMessage 
            key={item._id}
            _id={item._id}
            username={item.username}
            message={item.message}
            image={item.image}
            timestamp ={item.timestamp}
          // insert data from query into RoomCards component
          // using placeholder for developement
          />
        ))}
        </div>
          <form className='message-form-container' onSubmit={handleMessageFormSubmit}>
            <input
              className="message-form-input"
              placeholder="Your Message"
              name="message"
              type="message"
              value={messageState.message}
              onChange={handleMessageFormChange}
            />
            <button
              className="messageSubmitButton"
              style={{ cursor: 'pointer' }}
              type="submit"
              >
              Send
            </button>
          </form>
        {/* use userinput component to allow users to send messages to chatroom */}
      </div>
    );
  };
  
  export default ChatRoom;