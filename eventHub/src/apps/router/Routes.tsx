import { createBrowserRouter } from 'react-router-dom';
import App from '../layouts/App';
import EventDashBoard from '../../feature/events/dashboard/EventDashBoard';
import EventDetailedPage from '../../feature/events/details/EventDetailedPage';
import EventForm from '../../feature/events/dashboard/form/EventForm';
import Scratch from '../../feature/scratch/Scratch';
import AccountPage from '../../feature/auth/AccountPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/events',
        element: <EventDashBoard />,
      },
      {
        path: '/events/:id',
        element: <EventDetailedPage />,
      },
      {
        path: '/manage/:id',
        element: <EventForm />,
      },
      {
        path: '/createEvent',
        element: <EventForm key="create" />,
      },
      {
        path: '/account',
        element: <AccountPage />,
      },
      {
        path: '/scratch',
        element: <Scratch />,
      },
    ],
  },
]);
