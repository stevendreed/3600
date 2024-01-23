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

// App returns our Outlet (determined by url route) and is wrapped by our Provider/Client
function App() {

  return (
    <ApolloProvider 
    client={client}
    >

      {/* main container that holds everything */}
      <div className="flex-column justify-center align-center min-100-vh bg-primary">

        {/* header that appears in top right of webpage */}
        <Header />

        {/* UserSidebar appears on the left side of the screen */}
        <UserSidebar />

        {/* contains the content of the outlet, covers the most area.
          Appears in the middle/slightly-lower right of the screen */}
        <div className="OutletContainer">
          {/* Renders content depending on routing */}
          <Outlet />
        </div>
        
      </div>
    </ApolloProvider>
  )
}

export default App
