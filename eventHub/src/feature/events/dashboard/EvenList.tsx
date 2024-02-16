import { AppEvent } from '../../../apps/layouts/types/event';
import EventListItem from './EventListItem';

type Props = {
  events: AppEvent[];
  selectEvent: (event: AppEvent) => void;
  deleteEvent: (eventId: string) => void;
};
export default function EvenList({ events, selectEvent, deleteEvent }: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          event={event}
          key={event.id}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}
