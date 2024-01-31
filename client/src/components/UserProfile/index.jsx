// componenet which renders user profile information once logged in

// link is used so we can click on recent rooms / our room and go to that chatroom
import { Link } from 'react-router-dom'

const UserProfile = () => {

    return (

    <div className='userProfile'>

        {/* img src should be dependant on context.user.profileimg or something
         similar */}
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

    );
    
}

export default UserProfile