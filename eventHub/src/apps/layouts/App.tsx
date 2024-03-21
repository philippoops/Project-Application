import { Container } from 'semantic-ui-react';
import NavBar from './nav/NavBar';

import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import ModalManager from '../common/modal/ModalManager';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAppDispatch } from '../../store/store';
import { logout, signIn } from '../../feature/auth/authSlice';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logout());
        }
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }, [dispatch]);

  return (
    <>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          {/* scrollrestoration is a react router dom use to back on the top of the page */}
          <ScrollRestoration />
          <ModalManager />
          <NavBar />
          <Container className="main">
            {location.pathname === '/' ? <HomePage /> : <Outlet />}
          </Container>
        </>
      )}
    </>
  );
}

export default App;
