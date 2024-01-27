import { gql } from '@apollo/client';

// placeholder chatroom query
export const QUERY_CHATROOM = gql`
  query getChatroom($_id: ID) {
    Chatroom(_id: $_id) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;