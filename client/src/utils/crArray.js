// crArray.js => Chatroom Array function
// 
// PURPOSE
// query GraphQL/Apollo server for the conplete list of valid
// chatrooms & returns this array of objects ordered per parameters
//
// PARAMETERS
// sortBy => a key-value pair, with the following list of supported values:
// sortBy: "oldest", "newest", "userCount"
//


// imports



// function prototype
const getCRArray = async function(sortBy)
{
  // 1: initialize local scope variables:
  // crArray = an array of objects. Each element is chatroom data with
  // { _id, title, owner, tags, icon, createdAt }
  // mutation = a string that is passed to the GraphQL Apollo server s.t.
  // 

  let crArray = [];

  // 2: query apollo server for ALL chatrooms with 
  // createdAt values > Date.now() - (60 * 60 * 1000)

  // 3: sort the incoming data (either in the mutation or client-side) by the 
  // sortBy value (oldest, newest, userCount)

  // 4: return the array of objects 
  return crArray;
}; // end getCRArray


export default getCRArray;
