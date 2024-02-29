import { Grid } from 'semantic-ui-react';
import EvenList from './EvenList';

import { useAppSelector } from '../../../store/store';
import { useEffect } from 'react';

import LoadingComponents from '../../../apps/layouts/LoadingComponents';
import { actions } from '../eventSlice';
import { useFireStore } from '../../../apps/hooks/firestore/useFireStore';

export default function EventDashBoard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore('events');
  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  if (status === 'loading') return <LoadingComponents />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EvenList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
