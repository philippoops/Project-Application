import { Image, List } from 'semantic-ui-react';
import { Attendee } from '../../../apps/layouts/types/event';
import { Link } from 'react-router-dom';

type Props = {
  attendee: Attendee;
};
export default function EventListAtendee({ attendee }: Props) {
  return (
    <List.Item as={Link} to={`/profiles/${attendee.id}`}>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
}
