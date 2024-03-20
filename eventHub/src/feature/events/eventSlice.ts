import { PayloadAction } from '@reduxjs/toolkit';
import { AppEvent } from '../../apps/layouts/types/event';
import { Timestamp } from 'firebase/firestore';
import {
  GenericAction,
  GenericState,
  createGenericSlice,
} from '../../store/genericSlice';
import { auth } from '../../apps/config/firebase';

type State = {
  data: AppEvent[];
};

const initialState: State = {
  data: [],
};

export const eventSlice = createGenericSlice({
  name: 'events',
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = action.payload;
        state.status = 'finished';
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];
        Array.isArray(events) ? (eventArray = events) : eventArray.push(events);
        const mapped = eventArray.map((e: any) => {
          return {
            ...e,
            date: (e.date as Timestamp).toDate().toISOString(),
            isHost: auth.currentUser?.uid === e.hostUid,
            isGoing: e.attendeeIds.includes(auth.currentUser?.uid),
          };
        });
        return { payload: mapped };
      },
    },
    // Use this function in redux function via reducer but now because we use firestore no need to use this
    // createEvent: (state, action) => {
    //   state.events.push(action.payload);
    // },
    // updateEvent: (state, action) => {
    //   state.events[
    //     state.events.findIndex((evt) => evt.id === action.payload.id)
    //   ] = action.payload;
    // },
    // deleteEvent: (state, action) => {
    //   state.events.splice(
    //     state.events.findIndex((evt) => evt.id === action.payload),
    //     1
    //   );
    // },
  },
});

export const /*{createEvent, updateEvent, deleteEvent, setEvents }*/ actions =
    eventSlice.actions as GenericAction<AppEvent[]>;
