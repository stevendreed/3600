import { gql, useQuery } from '@apollo/client';


  // GET all chatrooms created in the last hour 
  // WORK IN PROGRESS
const GET_ALL_CHATROOMS = gql`
  query GET_ALL_CHATROOMS {
    chatrooms
    {
        createdAt
        _id
    }
  }
`

