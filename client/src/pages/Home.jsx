import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHATROOMS } from '../utils/apolloQL';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const { loading, error, data } = useQuery(GET_CHATROOMS, {
    variables: {
      options: {
        sortBy: 'newest',
        filterActive: true,
      },
    },
  });  

  console.log(data);
  console.log(JSON.stringify(error, null, 2));

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error loading chatrooms:", error);
    return <p>Error loading chatrooms.</p>;
  }

  if (data?.GET_CHATROOMS?.length === 0) {
    return <p>No chatrooms available.</p>;
  }  

  return (
    <div className='card-container'>
      {data?.getChatrooms?.map((chatroom) => (
        <RoomCard 
          key={chatroom._id}
          _id={chatroom._id}
          icon={chatroom.icon} 
          title={chatroom.title}
          tags={chatroom.tags ? chatroom.tags.map(tag => tag.name).join(', ') : 'No Tags'}
        />
      ))}
    </div>
  );  
};

export default Home;