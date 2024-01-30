import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import UserSidebar from './components/UserSidebar';


// //TEMPLATE DATA ---------------------------------
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
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 3,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 4,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 5,
//     title: "ExampleTitle",
//     tags: "exampletag",
//     messages: [messagesData],
//     timer: 3600,
//   },
//   {
//     _id: 6,
//     title: "ExampleTitle",
//     tags: "exampletag",
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
// ];

// const userData = 
//   {
//       _id: 1,
//       username: "David27",
//       image: "profileimgexample.jpg",
//       recentRooms: [chatroomData[1], chatroomData[4], chatroomData[3]],
//       yourRoom: [chatroomData[2]],
//       timer: 3600,
//   }
//   // ------------------------------------------------

// App returns our Outlet (determined by url route) and is wrapped by our Provider/Client
function App() {
  return (
    <div className="mainContainer">
      <UserSidebar />
      <div className="routeContainer">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
