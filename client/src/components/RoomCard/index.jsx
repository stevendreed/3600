// this will will be the individual cards rendered on the home page for each chat room

// link takes us to the chatroom we click on
import { Link } from 'react-router-dom'

// function to export our homepage content to Outlet in App.jsx based on url defined in Main.jsx
const RoomCard = ({ _id, image, title, tags, timer }) => {
  return (
    <Link className='card' to={`/Chatroom/${_id}`}>
      <img src={`/images/${image}`} alt={title}></img>
      <h1>{title}</h1>
      <h2>{tags}</h2>
      <h3>{timer}</h3>
    </Link>
  );
};

export default RoomCard