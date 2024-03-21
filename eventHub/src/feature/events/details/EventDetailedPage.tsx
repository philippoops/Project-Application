import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { useEffect } from 'react';

import { actions } from '../eventSlice';
import LoadingComponents from '../../../apps/layouts/LoadingComponents';
import { useFireStore } from '../../../apps/hooks/firestore/useFireStore';

export default function EventDetailedPage() {
  const { loadDocument } = useFireStore('events');
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.events);
  useEffect(() => {
    if (!id) return;
    // use this for comparison what happening in the firestore.ts
    // const unsubscribe = onSnapshot(doc(db, 'events', id), {
    //   next: (doc) => {
    //     dispatch(actions.success({ id: doc.id, ...doc.data() } as any));
    //     setLoading(false);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     toast.error(err.message);
    //     setLoading(false);
    //   },
    // });

    // return () => unsubscribe();
    loadDocument(id, actions);
  }, [id, loadDocument]);
  // import the loading content

  if (status === 'loading') return <LoadingComponents />;
  if (!event) return <h2>Event not found</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
}
