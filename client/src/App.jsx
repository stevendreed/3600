import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useState } from 'react'

// setting apolloclient to work with graphql
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// App returns our Outlet (determined by url route) and is wrapped by our Provider/Client
function App() {
  const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>
  )
}

export default App
