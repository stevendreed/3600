// this will will be the individual cards rendered on the home page for each chat room

// function to export our homepage content to Outlet in App.jsx based on url defined in Main.jsx
const RoomCard = (item) => {

// what we want to render
return (
  <div className="card">
      <img src={`/images/${item.image}`}></img>
    {/* <h1>
        {item.title}
    </h1> 
    <h2>{item.tags}</h2>
    <h3>{item.timer}</h3>*/}
    <button onClick={function () {
        console.log(`RoomCard -> title was clicked`);
        // TASKS:

        // IF: user => redirect to chatroom
        
        // IF: !user => "you must sign in" modal/alert
    }}>
        {item.title}
    </button>
    <button onClick={function () {
        console.log(`RoomCard -> tags was clicked`);
        // TASKS
        // IF: owner of room => allow adding tags

        // IF: !owner => display tags w/o editing ability
    }}>
        {item.tags}
    </button>
    <button onClick={function () {
        console.log(`RoomCard -> timer was clicked`);
        // not sure if we want functionality here, but if
        // all of the el on each card is a button it makes
        // styling them easier :)
    }}>
        {item.timer}
    </button>
    
  </div>    
);

}

export default RoomCard