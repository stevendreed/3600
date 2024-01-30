// this will will be the individual cards rendered on the home page for each chat room

// link takes us to the chatroom we click on
import { Link } from 'react-router-dom'

// function to export our homepage content to Outlet in App.jsx based on url defined in Main.jsx
const RoomCard = (item) => {

// EXAMPLE attaching 
    // const testing = () => {
    //     console.log("haha")
    //   }

    //   <h1 onClick={() => testing()}>{item.title}</h1>

// what we want to render
return (
    <Link className='card' to={`/Chatroom/${item._id}`}>
        <img src={`/images/${item.image}`}></img>
        <h1>{item.title}</h1>
        <h2>{item.tags}</h2>
        <h3>{item.timer}</h3>
    </Link>
    
)

}

export default RoomCard