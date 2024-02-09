import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';
type Props = {
  setFormOpen: (value: boolean) => void;
};
export default function EventForm({ setFormOpen }: Props) {
  return (
    <Segment clearing>
      <Header content="Create Event" />
      <Form>
        <Form.Field>
          <Input type="text" placeholder="Event Title" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Venue" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Date" />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          onClick={() => setFormOpen(false)}
          type="submit"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
