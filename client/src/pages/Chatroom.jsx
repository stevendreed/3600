import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { chatrooms, getMessages, ADD_MESSAGE } from '../utils/apolloQL';
import ChatroomMessage from '../components/ChatroomMessage';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


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