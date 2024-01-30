// this will be the header, and is rendered on each page
// will contain ternaries depending on url to render either siteinfo or room
// info
// (Like room title, timer, ect...)

import Home from '../../pages/Home'
import { useNavigate } from 'react-router-dom'

// function to export our header content to Outlet in App.jsx based on url
// defined in Main.jsx
const Header = () => {

    // this will check the url to see if the user is in a chatroom
    // there will then be a useParams function to pull the chatroom's id from the url string
    // then do a database query for the chatroom's info to render in the header instead of 'sort rooms' and 'One Hour Chatrooms'
    // if (window.location.href.indexOf("chatRoom") > -1)

    // what we want to render
    return (
        <div className="header">

            <a href="/"><img className="headerLogo" src="../images/logo-clock.svg"></img></a>

            <p>One Hour Chatrooms</p>

    {/* room sorting dropdown menu */}
    <div className='sortDropdown'>
    <button>Sort Rooms By...</button>
      <div className='dropdownOptions'>
      {/* sort rooms by active users */}
      <button id='sortbyUsers' onClick=
        { function() {
          // onClick should reorder our array of chatrooms by MOST USERS, 
          // then display by most users
        } 
      }>Most Users</button>
      {/* sort rooms old to new */}
      <button id='sortbyOld' onClick=
        { function() {
          // onClick should reorder our array of chatrooms by greatest time,
          // then display by most users
        }
        }>Oldest</button>
      {/* sort rooms new to old */}
      <button id='sortbyNew' onClick=
        { function() {
          // same functionality as sortbyOld, but reverse order
        }
        }>Newest</button>
      </div>
    </div>

  </div>
  );
  
  }
  
  export default Header