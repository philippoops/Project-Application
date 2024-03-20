import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import SignOutButton from './SignOutButton';
import SignInMenu from './SignInMenu';
import { useAppSelector } from '../../../store/store';
// import { sampleData } from '../../api/sampleData';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../../config/firebase';

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  // function seedData() {
  //   sampleData.forEach(async (event) => {
  //     const { id, ...rest } = event;

  //     await setDoc(doc(db, 'events', id), {
  //       ...rest,
  //     });
  //   });
  // }

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
        {/* This process use to send the data to the firestore database */}
        {/* {import.meta.env.DEV && (
          <MenuItem>
            <Button
              inverted={true}
              color="teal"
              content="Seed data"
              onClick={seedData}
            />
          </MenuItem>
        )} */}
        {authenticated ? <SignInMenu /> : <SignOutButton />}
      </Container>
    </Menu>
  );
}
