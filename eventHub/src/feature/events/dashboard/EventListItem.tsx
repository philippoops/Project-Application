import {
  Button,
  Icon,
  Item,
  ItemGroup,
  Label,
  List,
  Segment,
  SegmentGroup,
} from 'semantic-ui-react';
import EventListAtendee from './EventListAtendee';
import { AppEvent } from '../../../apps/layouts/types/event';
import { Link } from 'react-router-dom';

// import { useFireStore } from '../../../apps/hooks/firestore/useFireStore';

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  // const [loading, setLoading] = useState(false);

  //   // this a previous code iuse for reference

  // async function removeEvent() {
  //   // setLoading(true);
  //   // try {
  //   //   await deleteDoc(doc(db, 'events', event.id));
  //   // } catch (error: any) {
  //   //   console.log(error);
  //   //   toast.error(error.message);
  //   // } finally {
  //   //   //  using this finally it will wait all try or catch block then after this is the one will run
  //   //   setLoading(false);
  //   }

  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL || '/user.png'}
            />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>{event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
        </span>

        <span>
          <Icon name="marker" /> {event.venue} {event.city}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee: any) => (
            <EventListAtendee attendee={attendee} key={attendee.id} />
          ))}
        </List>
      </Segment>

      <Segment clearing>
        <span>{event.description}</span>
        {/* <Button
          // loading={loading}
          onClick={() => remove(event.id)}
          color="red"
          floated="right"
          content="Delete"
        /> */}
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="blue"
          floated="right"
          content="View"
        />
      </Segment>
    </SegmentGroup>
  );
}
