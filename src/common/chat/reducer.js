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
      //Refresh UI before updating server storage but can't see the difference at this speed
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

    case 'JOIN_ROOM': {
      return Object.assign({}, state, {
        rooms: map((room, index) => {
          if (room.id === action.payload.roomId) {
            //TODO add empty members[] in initial state
            if(!room.members){
              room.members = []
            }
            return Object.assign({}, room, {
              members: [
                ...room.members,
                action.payload.user
              ]
            })
          };
          return room
        }, state.rooms)
      })
    }

    //TODO use object assign too here
    case 'LEAVE_ROOM': {
      var room = {...state.rooms[action.payload.roomId], };
      if(!room.members){
        return state
      };
      var memberIndex = room.members.findIndex( function(member) {
        return member.id === action.payload.userId
      });
      if (memberIndex > -1) {
        room.members.splice(memberIndex, 1)
      };

      const rooms = {...state.rooms, [action.payload.roomId]: room }
      return assocPath(['rooms'], rooms, state)
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
