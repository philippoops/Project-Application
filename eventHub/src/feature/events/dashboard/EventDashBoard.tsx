import { Grid } from 'semantic-ui-react';
import EvenList from './EvenList';
import { sampleData } from '../../../apps/api/sampleData';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../apps/layouts/types/event';

export default function EventDashBoard() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(function () {
    setEvents(sampleData);
  }, []);

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
