import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../apps/layouts/App.tsx';
import '../apps/layouts/style.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../apps/router/Routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
