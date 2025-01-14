import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import LoginPage from '../components/LoginPage/LoginPage';
import StartPage from '../components/StartPage/StartPage';
import Gamepage from '../components/GamePage/Gamepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/startpage',
    element: <StartPage />,
  },
  {
    path: '/gamepage',
    element: <Gamepage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
