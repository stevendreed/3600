import { gql, useQuery } from '@apollo/client';



const queries = {
 // GET all chatrooms created in the last hour 
  // WORK IN PROGRESS
  GET_ALL_CHATROOMS: gql`
  query GET_ALL_CHATROOMS {
    chatrooms
    {
        createdAt
        _id
    }
  }
  `
}
 

export default queries
