import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'

import App from './App.jsx'
// these pages need to be created and exported to properly render below
import Home from './pages/Home';
import Chatroom from './pages/Chatroom';
import CreateRoomForm from './pages/CreateRoomForm';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        // homepage functions also as the login page
        index: true,
        element: <Home />
      }, {
        // page where logged in users can create a room
        path: '/CreateRoom',
        element: <CreateRoomForm />
      }, {
        // specific chatroom a user has joined
        // chatroom uses a wildcard in its parameters to match the user with the correct database information
        path: '/Chatroom/:id',
        element: <Chatroom />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
