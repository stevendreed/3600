import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { chatrooms, getMessages, ADD_MESSAGE } from '../utils/apolloQL';
import ChatroomMessage from '../components/ChatroomMessage';


const Chatroom = () => {
  // Fetch chatrooms
  const { loading: loadingChatrooms, error: errorChatrooms, data: dataChatrooms } = useQuery(chatrooms);

  // Get chatroom ID from URL parameters
  const { id: chatroomId } = useParams();

  // Fetch messages for the specific chatroom
  const { loading: loadingMessages, error: errorMessages, data: dataMessages } = useQuery(getMessages, {
    variables: { chatroomId },
    skip: !chatroomId, // Skip this query if no chatroomId is provided
  });

  // State and mutation for creating a new message
  const [messageState, setMessageFormState] = useState({ message: '' });
  const [createMessage] = useMutation(ADD_MESSAGE);

  // Handle message form changes
  const handleMessageFormChange = (event) => {
    const { name, value } = event.target;
    setMessageFormState({ ...messageState, [name]: value });
  };

  // Handle message form submission
  const handleMessageFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createMessage({ variables: { ...messageState, chatroomId } });
      setMessageFormState({ message: '' });
    } catch (e) {
      console.error(e);
    }
  };

  if (loadingChatrooms) return <p>Loading chatrooms...</p>;
  if (errorChatrooms) return <p>Error loading chatrooms.</p>;

  return (
    <div>
      <h2>Chatrooms</h2>
      {dataChatrooms.chatrooms.map((chatroom) => (
        <div key={chatroom._id}>
          <h3>{chatroom.title}</h3>
        </div>
      ))}

{chatroomId && (
        <div className="chatroom-container">
          {loadingMessages ? (
            <p>Loading messages...</p>
          ) : errorMessages ? (
            <p>Error loading messages.</p>
          ) : (
            <div className='messages-container'>
              {dataMessages && dataMessages.messages.length > 0 ? (
                dataMessages.messages.map((item) => (
                  <ChatroomMessage 
                    key={item._id}
                    username={item.sender.username}
                    message={item.content}
                    image={item.sender.image}
                    timestamp={item.createdAt}
                  />
                ))
              ) : (
                <p>No messages in this chatroom.</p> 
              )}
            </div>
          )}

          <form className='message-form-container' onSubmit={handleMessageFormSubmit}>
            <input
              className="message-form-input"
              placeholder="Your Message"
              name="message"
              type="message"
              value={messageState.message}
              onChange={handleMessageFormChange}
            />
            <button className="messageSubmitButton" type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatroom;






// // will render the chatroom component
// import { useQuery, useMutation } from '@apollo/client';
// import { Link, useParams } from 'react-router-dom';
// import { useContext, useState } from 'react';

// import { CREATE_MESSAGE } from '../utils/mutations';

// import RoomCard from '../components/RoomCard'
// import ChatroomMessage from '../components/ChatroomMessage'

// // PLACEHOLDER DATA TO SIMULATE CHATROOM - replace with chatroom query using useParams to get the chatroom's id

// // const exampleChatRoom = {
// //   title: "Exampleroom",
// //   tags: ["tag1", "tag2"],
// //   messages: [
// //     {
// //       _id: 1,
// //       username: "Monica",
// //       message: "Hello, my name is Monica",
// //       image: "/images/person2.svg",
// //       timestamp: "111111"
// //     },
// //     {
// //       _id: 2,
// //       username: "bob",
// //       message: "AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAA",
// //       image: "/images/profileimgexample.jpg",
// //       timestamp: "2222222"
// //     },
// //     {
// //       _id: 3,
// //       username: "Monica",
// //       message: "Wow, that is really uncalled for",
// //       image: "/images/person2.svg",
// //       timestamp: "33333333"
// //     },
// //     {
// //       _id: 4,
// //       username: "bob",
// //       message: "Sorry.",
// //       image: "/images/profileimgexample.jpg",
// //       timestamp: "444444444"
// //     },
// //     {
// //       _id: 5,
// //       username: "Dean",
// //       message: "I think screaming is perfectly healthy and fun.",
// //       image: "/images/person6.svg",
// //       timestamp: "444444444"
// //     },
// //   ]
// // }

// const ChatRoom = () => {

//   // chatroom's id we are taking from the page's url parameters
//   const { id } = useParams();

//   // Create a state for your message 
//   const [messageState, setMessageFormState] = useState({ message: '' });
//   // assign mutation to a const variable
//   const [createMessage] = useMutation(CREATE_MESSAGE);

//   // whenever a modification to the form is made, add that change to the state
//   const handleMessageFormChange = (event) => {
//     const { name, value } = event.target;

//     setMessageFormState({
//         ...messageState,
//         [name]: value,
//     });
//     };

//     // on submit, attempt to fire off CREATE_MESSAGE mutation using the data from the messageState
//     // we also need to add the user's username from context (once that is working)
//     const handleMessageFormSubmit = async (event) => {
//       event.preventDefault();
  
//       try {
//           const { data } = await createMessage({
//           variables: { ...messageState },
//           });
  
//       } catch (e) {
//           console.error(e);
//       }

//       // clear form state after mutation
//       setMessageFormState({
//           message: ''
//           });
//   };
  
//     return (
//       <div className="chatroom-container">
//         <div className='messages-container'>
//         {exampleChatRoom.messages.map((item) => (
//           <ChatroomMessage 
//             key={item._id}
//             _id={item._id}
//             username={item.username}
//             message={item.message}
//             image={item.image}
//             timestamp ={item.timestamp}
//           // insert data from query into RoomCards component
//           // using placeholder for developement
//           />
//         ))}
//         </div>
//           <form className='message-form-container' onSubmit={handleMessageFormSubmit}>
//             <input
//               className="message-form-input"
//               placeholder="Your Message"
//               name="message"
//               type="message"
//               value={messageState.message}
//               onChange={handleMessageFormChange}
//             />
//             <button
//               className="messageSubmitButton"
//               style={{ cursor: 'pointer' }}
//               type="submit"
//               >
//               Send
//             </button>
//           </form>
//         {/* use userinput component to allow users to send messages to chatroom */}
//       </div>
//     );
//   };
  
//   export default ChatRoom;
