// will render the chatroom component
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { QUERY_CHATROOM } from '../utils/queries';

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
      message: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
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
  
    return (
      <div className="chatroom-container">
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
        {/* use userinput component to allow users to send messages to chatroom */}
      </div>
    );
  };
  
  export default ChatRoom;