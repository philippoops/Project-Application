import React from 'react';
import ReactDOM from 'react-dom/client';
import '../apps/layouts/style.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../apps/router/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
