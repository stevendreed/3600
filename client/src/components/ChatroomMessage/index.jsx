// this component renders a single chatroom message when the user is in a chatroom

const ChatroomMessage = (item) => {

// what we want to render
return (
    <div className="message">
        <p>{item.message}</p>
    </div>
)
}

export default ChatroomMessage;