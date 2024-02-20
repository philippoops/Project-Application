import { AppEvent } from '../../../apps/layouts/types/event';
import EventListItem from './EventListItem';

type Props = {
  events: AppEvent[];
};
export default function EvenList({ events }: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}
