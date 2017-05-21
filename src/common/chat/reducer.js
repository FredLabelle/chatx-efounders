// @flow
import type { Action, ChatState } from '../types';
import { assocPath } from 'ramda';

const initialState = {
  rooms: null,
  currentRoom: null,
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

    case 'SELECT_ROOM': {
      var room = action.payload.room
      return { ...state, currentRoom: room };
    }

    case 'SEND_MESSAGE': {
      var message = action.payload.message
      var currentRoomMessages = state.currentRoom.messages ? state.currentRoom.messages.slice() : []
      currentRoomMessages.push(message)
      return assocPath(['currentRoom', 'messages'],currentRoomMessages ,state);
    }

    default:
      return state;
  }
};

export default reducer;
