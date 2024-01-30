import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import UserSidebar from './components/UserSidebar';



// App returns our Outlet (determined by url route) and is wrapped by our Provider/Client
function App() {
  return (
    <div className="mainContainer">
      <UserSidebar />
      <div className="routeContainer">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
