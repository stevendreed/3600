import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Chatroom from '../pages/Chatroom';
import CreateRoom from '../pages/CreateRoom';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: '/CreateRoom',
        element: <CreateRoom />,
      },
      {
        path: '/Chatroom/:id', 
        element: <Chatroom />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export { router };

