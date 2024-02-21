import { Grid } from 'semantic-ui-react';
import EvenList from './EvenList';

import { useAppSelector } from '../../../store/store';

export default function EventDashBoard() {
  const { events } = useAppSelector((state) => state.events);

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
