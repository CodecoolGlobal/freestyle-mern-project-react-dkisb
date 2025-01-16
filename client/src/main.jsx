import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import LoginPage from '../components/LoginPage/LoginPage';
import StartPage from '../components/StartPage/StartPage';
import Gamepage from '../components/GamePage/Gamepage';
import AccountPage from '../components/AccountPage/AccountPage';
import AccountUpdater from '../components/AccountPage/AccountUpdater';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/startpage',
    element: <StartPage />,
  },
  {
    path: '/gamepage',
    element: <Gamepage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
  {
    path: '/update/:id',
    element: <AccountUpdater />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
