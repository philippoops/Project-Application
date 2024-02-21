import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import SignOutButton from './SignOutButton';
import SignInMenu from './SignInMenu';
import { useState } from 'react';

export default function NavBar() {
  const [auth, setAuth] = useState(false);
  return (
    <Menu inverted={true} fixed="top">
      <Container>
        {/* this "as" was property of sementic to used to substitute the funtion like navlink */}
        <MenuItem header as={NavLink} to="/">
          <img src="/logo.png" alt="logo" />
          EventHub
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to="/events" />
        <MenuItem name="Scratch" as={NavLink} to="/scratch" />

        <MenuItem>
          <Button
            as={NavLink}
            to="/createEvent"
            floated="right"
            positive={true}
            inverted={true}
            content="Create event"
          />
        </MenuItem>
        {auth ? (
          <SignInMenu setAuth={setAuth} />
        ) : (
          <SignOutButton setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
}
