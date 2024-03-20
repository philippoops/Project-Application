import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { Profile } from '../../apps/layouts/types/profile';
import { useFireStore } from '../../apps/hooks/firestore/useFireStore';
import { useAppSelector } from '../../store/store';
import { CollectionOptions } from '../../apps/hooks/firestore/types';
import { actions } from '../events/eventSlice';

type Props = {
  profile: Profile;
};
export default function ProfileEvents({ profile }: Props) {
  const { loadCollection } = useFireStore('events');
  const { data: events, status } = useAppSelector((state) => state.events);
  const panes = [
    { menuItem: 'Future events', pane: { key: 'future' } },
    { menuItem: 'Past events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ];
  const initialOptions: CollectionOptions = {
    queries: [
      {
        attribute: 'attendeeIds',
        operator: 'array-contains',
        value: profile.id,
      },
      { attribute: 'date', operator: '>=', value: new Date() },
    ],
    sort: { attribute: 'date', order: 'asc' },
  };
  const [options, setOptions] = useState<CollectionOptions>(initialOptions);

  // setting up the data for query
  function handleSetQuery(tab: number) {
    let options: CollectionOptions = {} as CollectionOptions;

    switch (tab) {
      case 1: // past events
        options.queries = [
          {
            attribute: 'attendeeIds',
            operator: 'array-contains',
            value: profile.id,
          },
          { attribute: 'date', operator: '<', value: new Date() },
        ];
        break;
      case 2: //hoted
        (options.queries = [
          {
            attribute: 'hostUid',
            operator: '==',
            value: profile.id,
          },
        ]),
          (options.sort = { attribute: 'date', order: 'asc' });
        break;
      default:
        options = initialOptions;
        break;
    }
    setOptions(options);
  }

  useEffect(() => {
    loadCollection(actions, options);
  }, [loadCollection, options]);
  return (
    <Tab.Pane loading={status === 'loading'}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="events" />
        </Grid.Column>

        <Grid.Column width={16}>
          <Tab
            onTabChange={(_e, data) =>
              handleSetQuery(data.activeIndex as number)
            }
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map((event) => (
              <Card as={Link} to="/" key={event.id}>
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Content>
                    <Card.Header content={event.title} textAlign="center" />
                    <Card.Meta textAlign="center">
                      <span>{event.date}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
