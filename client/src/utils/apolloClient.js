import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:5173/graphql',
//   options: {
//     reconnect: true,
//   },
// });

// solution from 
// https://community.apollographql.com/t/subscriptions-websocket-connection-to-
// ws-localhost-4000-graphql-failed/3439/5
const wsLink = new GraphQLWsLink(createClient({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
