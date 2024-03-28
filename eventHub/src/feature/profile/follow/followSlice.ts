import { Follow } from '../../../apps/layouts/types/profile';
import { GenericState, createGenericSlice } from '../../../store/genericSlice';

type State = {
  data: Follow[];
};

const initialState: State = {
  data: [],
};

export const followSlice = createGenericSlice({
  name: 'follow',
  initialState: initialState as GenericState<Follow[]>,
  reducers: {},
});

export const actions = followSlice.actions;
