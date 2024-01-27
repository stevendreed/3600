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
        # ADD key-values under activeUsers object to add other data in res
        activeUsers {
          username
        }
    }
  }
  `,
  // WORK IN PROGRESS
  GET_MESSAGES: gql`
  query GET_MESSAGES {
    messages
    {
      sender
      content
    }
  }
  `
}
 

export default queries
