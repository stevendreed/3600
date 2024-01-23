// home page, will render the RoomCards component for each of our active chatrooms

// useQuery is used to run our queries from the backend
import { useQuery } from '@apollo/client';

// this component will run a .map() function to render all of our rooms
import RoomCard from '../components/RoomCard';
// placeholder data is used to simulate data we would input
import placeholderData from '../utils/placeholderData'

// This is an example of how we import one of our queries
// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
    // This is an example of how we run our query through frontend
    // const { loading, data } = useQuery(QUERY_THOUGHTS);

    // if no data is returned, set thoughts to an empty array
    // const thoughts = data?.thoughts || [];
  
    return (
      <main>
        <RoomCard 
        // insert data from query into RoomCards component
        // using placeholder for developement
        data={placeholderData.chatroomData}/>
      </main>
    );
  };
  
  export default Home;


