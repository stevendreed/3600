// useQuery is used to run our queries from the backend
import { useQuery } from '@apollo/client';

// this component will run a .map() function to render all of our rooms
import RoomCards from '../components/RoomCards';

// This is an example of how we import one of our queries
// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
    // This is an example of how we run our query through frontend
    // const { loading, data } = useQuery(QUERY_THOUGHTS);

    // if no data is returned, set thoughts to an empty array
    // const thoughts = data?.thoughts || [];
  
    return (
      <main>
        <RoomCards 
        card={placeholderData}/>
      </main>
    );
  };
  
  export default Home;

    // this placeholderdata is to be used for front-end developement and is used to simulate
    // data taken from the backend
  const placeholderData = [
    {},
    {},
    {}
  ]


