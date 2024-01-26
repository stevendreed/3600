// this will will be the individual cards rendered on the home page for each chat room

// function to export our homepage content to Outlet in App.jsx based on url defined in Main.jsx
const RoomCard = (item) => {

// what we want to render
return (
    <div className="card">
        <img src={`/images/${item.image}`}></img>
        <h1>{item.title}</h1>
        <h2>{item.tags}</h2>
        <h3>{item.timer}</h3>
    </div>
    
)

}

export default RoomCard