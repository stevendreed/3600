// this component renders a single chatroom message when the user is in a chatroom

const ChatroomMessage = (item) => {

// rendering poster's profile image, username, timestamp of message creation, and the message itself
return (
    <div className="message-container">
        <div className="message-userInfo">
            <img src={item.image}></img>
            <h3>{item.username}</h3>
            <p>Posted at: {item.timestamp}</p>
        </div>
        <p className="message">{item.message}</p>
    </div>
)
}

export default ChatroomMessage;