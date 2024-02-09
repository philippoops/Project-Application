export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  atendees: Attendee[];
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
