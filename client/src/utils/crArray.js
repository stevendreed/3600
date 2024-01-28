// crArray.js => Chatroom Array function
// 
// PURPOSE
// query GraphQL/Apollo server for the conplete list of valid
// chatrooms & returns this array of objects ordered per parameters
//
// PARAMETERS
// sortBy => a string, with the following list of supported values:
// "oldest", "newest", "userCount"
//


// imports
import { gql } from '@apollo/client';

// function prototype
const getCRArray = async function(sortBy)
{
  // 1: initialize local scope variables:
  //
  // crArray = an array of objects. Each element is chatroom data with
  // { _id, title, owner, tags, icon, createdAt }
  let crArray = [];
  // mutation = a string that is passed to the GraphQL Apollo server s.t.

  const query = {
    oldest: gql``,
    newest: gql``,
    userCount: gql``
  }

  // 2: query apollo server for ALL chatrooms with 
  // createdAt values > Date.now() - (60 * 60 * 1000)
  
  const { data } = await client.query({
    query: query.sortBy,
  });

  // 3: sort the incoming data (either in the mutation or client-side) by the 
  // sortBy value (oldest, newest, userCount)

  // 4: return the array of objects 
  return crArray;
}; // end getCRArray


export default getCRArray;
