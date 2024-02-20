import { Container } from 'semantic-ui-react';
import NavBar from './nav/NavBar';

import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
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
