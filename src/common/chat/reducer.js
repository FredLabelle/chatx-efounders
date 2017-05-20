// @flow
import type { Action, ChatState } from '../types';
import { assocPath } from 'ramda';

const initialState = {
  rooms: null,
};

const reducer = (
  state: ChatState = initialState,
  action: Action,
): ChatState => {
  switch (action.type) {
    case 'CREATE_ROOM': {
      var rooms = state.rooms ? state.rooms.slice() : []
      rooms.push(action.payload.room)
      return { ...state, rooms: rooms };
    }

    default:
      return state;
  }
};

export default reducer;
