// componenet which renders user profile information once logged in

// link is used so we can click on recent rooms / our room and go to that chatroom
import { Link } from 'react-router-dom'


// dummy user data for user UserProfile componenet to render
const userData = {
    _id: 1,
    username: "David27",
    image: "dog.svg",
    recentRooms: [
      {
        _id: 2,
        title: "ExampleTitle",
        tags: ["example ", "example2 ", "example3"],
        messages: 6,
        timer: 3600,
      },
      {
        _id: 3,
        title: "Another Title",
        tags: "exampletag",
        messages: 7,
        timer: 3600,
      },
      {
        _id: 4,
        title: "Title 3",
        tags: "exampletag",
        messages: 8,
        timer: 3600,
      },
  ],
  yourRoom: {
      _id: 1,
      title: "Chatroom",
      tags: ["casual ", "Toronto "],
      image: "profileimgexample.jpg",
      messages: 5,
      timer: 3600,
    },
}

const UserProfile = () => {

    return (

    <div className='userProfile'>

        {/* img src should be dependant on context.user.profileimg or something similar */}
        <img src={`/images/${userData.image}`}></img>
        {/* username should be dependant on context.user.username */}
        <h2>{userData.username}</h2>
        {/* logout button should invoke a function to remove current user context / remove current jwt token */}
        <button className='pRoomLink'>Logout</button>

        {/* your room would be a value assigned to a user schema, like context.user.yourRoom */}
        <div className="yourRoom">
            <h3>Your Room</h3>
            <ul>
            <Link to={`/Chatroom/${userData.yourRoom._id}`}><li className='pRoomLink'>{userData.yourRoom.title}</li></Link>
            </ul>
        </div>

        {/* context.user.rooms -> sort by most recent -> list only the most recent 3 */}
        {/* like after sorting, do room[0].title, room[1].title, room[1].title */}
        {/* they also need to be clickable and take the user to the correct room id url */}
        <div className="recentRooms">
            <h3>Recent Rooms</h3>
            <ul>
            <Link  to={`/Chatroom/${userData.recentRooms[2]._id}`}><li className='pRoomLink'>{userData.recentRooms[2].title}</li></Link>
            <Link  to={`/Chatroom/${userData.recentRooms[1]._id}`}><li className='pRoomLink'>{userData.recentRooms[1].title}</li></Link>
            <Link  to={`/Chatroom/${userData.recentRooms[0]._id}`}><li className='pRoomLink'>{userData.recentRooms[0].title}</li></Link>
            </ul>
        </div>
    </div>

    )
    
}

export default UserProfile