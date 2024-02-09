import { Image, List } from 'semantic-ui-react';
import { Attendee } from '../../../apps/layouts/types/event';

type Props = {
  attendee: Attendee;
};
export default function EventListAtendee({ attendee }: Props) {
  return (
    <List.Item>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
}
