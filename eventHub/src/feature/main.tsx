import React from 'react';
import ReactDOM from 'react-dom/client';
import '../apps/layouts/style.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../apps/router/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { ToastContainer } from 'react-toastify';
// Import the css of toastify
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* I use a react-toastify package here */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
