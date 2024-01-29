import { gql } from '@apollo/client';

export const GET_ALL_CR = gql`query Query {
  chatrooms {
    _id
    activeUsers {
      username
    }
    createdAt
    icon
    tags {
      name
    }
    title
  }
}`;

