// home page, will render the RoomCards component for each of our active chatrooms

// // useQuery is used to run our queries from the backend
// import { useQuery } from '@apollo/client';

// this component will run a .map() function to render all of our rooms
import React from 'react';
import { useQuery } from '@apollo/client';
import RoomCard from '../components/RoomCard';
import { GET_CHATROOMS } from '../utils/apolloQL';

const Home = () => {
  const { loading, error, data } = useQuery(GET_CHATROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading chatrooms.</p>;

  if (data.chatrooms.length === 0) {
    return <p>No chatrooms available.</p>;
  }

  return (
    <div className='card-container'>
      {data.getChatrooms.map((chatroom) => (
        <RoomCard 
          key={chatroom._id}
          _id={chatroom._id}
          image={chatroom.icon} 
          title={chatroom.title}
          tags={chatroom.tags.map(tag => tag.name).join(', ')}
        />
      ))}
    </div>
  );
};

export default Home;

