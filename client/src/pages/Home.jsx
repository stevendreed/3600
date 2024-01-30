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
      {data.chatrooms.map((chatroom) => (
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

// This is an example of how we import one of our queries
// import { QUERY_THOUGHTS } from '../utils/queries';

// //   simulates data from a chatroom's messages
// const messagesData = [
//   {
//       _id: 1,
//       username: "Some Guy",
//       message: "Hello People",
//   },
//   {
//       _id: 2,
//       username: "Some Guy2",
//       message: "Hello Peeople",
//   },
//   {
//       _id: 3,
//       username: "Some Guy3",
//       message: "Hello Peeeople",
//   },
//   {
//       _id: 4,
//       username: "Some Guy4",
//       message: "Hello Peeeeople",
//   },
// ]

// // simulates chatroomData to be rendered with RoomCards component
// const chatroomData = [
//   {
//       _id: 1,
//       title: "Chatroom",
//       tags: ["casual ", "Toronto "],
//       image: "profileimgexample.jpg",
//       messages: [messagesData],
//       timer: 3600,
//   },
//   {
//     _id: 2,
//     title: "ExampleTitle",
//     tags: ["example ", "example2 ", "example3"],
//     image: "cat.svg",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 3,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     image: "diamonds.svg",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 4,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     image: "buildings.svg",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 5,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     image: "gaming.svg",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 6,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     image: "person6.svg",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 7,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 8,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 9,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 10,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 11,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
// ]

