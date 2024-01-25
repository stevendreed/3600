// this will be the header, and is rendered on each page
// will contain ternaries depending on url to render either siteinfo or room info
// (Like room title, timer, ect...)

// function to export our header content to Outlet in App.jsx based on url defined in Main.jsx
const Header = () => {

    // what we want to render
    return (
        <div className="header">
            <h1>3600 Logo</h1>
            <p>site info?</p>
            <button className="sortDropdown">Sort Rooms By...</button>
        </div>
    )
    
    }
    
    export default Header