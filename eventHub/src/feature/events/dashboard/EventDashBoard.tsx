import { Grid } from 'semantic-ui-react';
import EvenList from './EvenList';
import EventForm from './form/EventForm';
import { sampleData } from '../../../apps/api/sampleData';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../apps/layouts/types/event';

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
};
export default function EventDashBoard({ formOpen, setFormOpen }: Props) {
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
        {formOpen && <EventForm setFormOpen={setFormOpen} />}
      </Grid.Column>
    </Grid>
  );
}
