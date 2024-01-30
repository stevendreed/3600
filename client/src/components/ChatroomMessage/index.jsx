// this component renders a single chatroom message when the user is in a chatroom
const ChatroomMessage = ({ username, message, image, timestamp }) => {
  return (
    <div className="single-message-container">
        <div className="message-userInfo">
            <img src={image} alt={`${username}`} />
            <h3>{username}</h3>
            <p>Posted at: {new Date(timestamp).toLocaleString()}</p>
        </div>
        <p className="message">{message}</p>
    </div>
  );
}


export default ChatroomMessage;