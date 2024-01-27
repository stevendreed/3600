// this will be the header, and is rendered on each page
// will contain ternaries depending on url to render either siteinfo or room info
// (Like room title, timer, ect...)

import queries from '../../utils/queries';

// function to export our header content to Outlet in App.jsx based on url defined in Main.jsx
const Header = () => {

    // what we want to render
    return (
        <div className="header">
            <h1>3600</h1>
            <p>One Hour Chatrooms</p>

            {/* room sorting dropdown menu */}
            <div className="sortDropdown">
                <button>Sort Rooms By...</button>
                <div className="dropdownOptions">
                    {/* sort rooms by active users */}
                    <button id="sortbyUsers" onClick={function () {
                        
                    }}>Most Users</button>
                    {/* sort rooms old to new */}
                    <button id="sortbyOld">Oldest</button>
                    {/* sort rooms new to old */}
                    <button id="sortbyNew">Newest</button>
                </div>
            </div>

        </div>
    )
    
    }
    
    export default Header