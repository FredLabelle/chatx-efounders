// @flow
import type { Action, ChatState } from '../types';
import { assoc, assocPath, update, map } from 'ramda';

const initialState = {
  rooms: null,
  currentRoomId: null,
  isFetching: false,
};

const reducer = (
  state: ChatState = initialState,
  action: Action,
): ChatState => {
  switch (action.type) {

    case 'CREATE_ROOM': {
      //state will be updated thanks to firebase synchro
      return state;
    }

    case 'SELECT_ROOM': {
      var roomId = action.payload.roomId
      return { ...state, currentRoomId: roomId };
    }

    case 'SEND_MESSAGE': {
      //Refresh UI before updating server storage (but can't see the difference with firebase speed)
      return Object.assign({}, state, {
        rooms: map((room, index) => {
          if (room.id === action.payload.message.roomId) {
            if(!room.messages){
              room.messages = []
            }
            return Object.assign({}, room, {
              messages: [
                ...room.messages,
                action.payload.message
              ]
            })
          };
          return room
        }, state.rooms)
      });
    }

    case 'FETCH_ROOMS': {
      return { ...state, isFetching: true }
    }

    case 'ROOMS_FETCHED': {
      if(!action.payload) {
        return state
      }
      return {...state, rooms: action.payload.rooms};
    }

    case 'ROOM_FETCHED': {
      if(!action.payload) {
        return state
      }
      let rooms = {...state.rooms, [action.payload.room.id]: action.payload.room }
      return assocPath(['rooms'], rooms, state)
    }

    default:
      return state;
  }
};

export default reducer;
