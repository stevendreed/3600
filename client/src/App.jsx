import './App.css';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache, 
  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import UserSidebar from './components/UserSidebar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//TEMPLATE DATA ---------------------------------
//   simulates data from a chatroom's messages
const messagesData = [
  {
      _id: 1,
      username: "Some Guy",
      message: "Hello People",
  },
  {
      _id: 2,
      username: "Some Guy2",
      message: "Hello Peeople",
  },
  {
      _id: 3,
      username: "Some Guy3",
      message: "Hello Peeeople",
  },
  {
      _id: 4,
      username: "Some Guy4",
      message: "Hello Peeeeople",
  },
]

// simulates chatroomData to be rendered with RoomCards component
const chatroomData = [
  {
      _id: 1,
      title: "Chatroom",
      tags: ["casual ", "Toronto "],
      image: "profileimgexample.jpg",
      messages: [messagesData],
      timer: 3600,
  },
  {
    _id: 2,
    title: "ExampleTitle",
    tags: ["example ", "example2 ", "example3"],
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 3,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 4,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 5,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 6,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 7,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 8,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 9,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 10,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
  {
    _id: 11,
    title: "ExampleTitle",
    tags: "exampletag",
    messages: [messagesData],
    timer: 3600,
  },
]

const userData = 
  {
      _id: 1,
      username: "David27",
      image: "profileimgexample.jpg",
      recentRooms: [chatroomData[1], chatroomData[4], chatroomData[3]],
      yourRoom: [chatroomData[2]],
      timer: 3600,
  }
  // ------------------------------------------------

// App returns our Outlet (determined by url route) and is wrapped by our Provider/Client
function App() {

  return (
    <ApolloProvider 
    client={client}
    >

      {/* main container that holds everything */}
      <div className="mainContainer">

        {/* UserSidebar appears on the left side of the screen */}
        <UserSidebar />

        {/* contains the content of the outlet and header, covers the most area.
          Appears on the right of the screen */}
        <div className="routeContainer">

          {/* header that appears in top right of webpage */}
          <Header />

          {/* Renders content depending on routing */}
          <Outlet />

        </div>
        
      </div>
    </ApolloProvider>
  )
}

export default App
