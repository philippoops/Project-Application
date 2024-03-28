import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { testSlice } from '../feature/scratch/testSlice';
import { eventSlice } from '../feature/events/eventSlice';
import { modalSlice } from '../apps/common/modal/modalSlice';
import { authSlice } from '../feature/auth/authSlice';
import { profileSlice } from '../feature/profile/profileSlice';
import { photoSlice } from '../feature/profile/photosSlice';
import { followSlice } from '../feature/profile/follow/followSlice';

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    events: eventSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    profiles: profileSlice.reducer,
    photos: photoSlice.reducer,
    follows: followSlice.reducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
