import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'

import App from './App.jsx'
// these pages need to be created and exported to properly render below
import Home from './pages/Home';
import Chatroom from './pages/Chatroom';
import CreateRoom from './pages/CreateRoom';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/CreateRoom',
        element: <CreateRoom />
      }, {
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
