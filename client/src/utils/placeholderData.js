// this file is to be used to simulate backend code on the frontend
// FOR DEVELOPEMENT ONLY


  const placeholderData = () => {

    // simulates chatroomData to be rendered with RoomCards component
    const chatroomData = [
        {
            _id: 1,
            title: "ExampleTitle",
            messages: [messagesData],
            timer: 3600,
        },
      ]


    //   simulates data from a chatroom's messages
      const messagesData = [
        {
            _id: 1,
            username: "Some Guy",
            message: "Hello People",
        },
        {
            _id: 2,
            username: "Some Guy2",
            message: "Hello Peeople",
        },
        {
            _id: 3,
            username: "Some Guy3",
            message: "Hello Peeeople",
        },
        {
            _id: 4,
            username: "Some Guy4",
            message: "Hello Peeeeople",
        },
      ]
    
  };
  
  export default placeholderData;