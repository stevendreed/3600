// this component renders a single chatroom message when the user is in a chatroom

const Message = (item) => {

// what we want to render
return (
    <div className="message">
        <p>{item.message}</p>
    </div>
)
}

export default Message;