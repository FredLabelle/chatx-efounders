// @flow
import type { Action, ChatState } from '../types';
import { assoc, assocPath, update } from 'ramda';

const initialState = {
  rooms: null,
  currentRoomId: null,
};

const reducer = (
  state: ChatState = initialState,
  action: Action,
): ChatState => {
  console.log(action);
  switch (action.type) {
    case 'CREATE_ROOM': {
      var rooms = state.rooms ? state.rooms.slice() : []
      rooms.push(action.payload.room)
      return { ...state, rooms: rooms };
    }

    case 'SELECT_ROOM': {
      var roomId = action.payload.roomId
      return { ...state, currentRoomId: roomId };
    }

    case 'JOIN_ROOM': {
      var roomIndex = state.rooms.findIndex( function(room) {
        return room.id === action.payload.roomId
      });
      var room = {...state.rooms[roomIndex], };
      if(!room.members){
        room.members = []
      };
      room.members.push(action.payload.user);
      return assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
    }

    case 'LEAVE_ROOM': {
      var roomIndex = state.rooms.findIndex( function(room) {
        return room.id === action.payload.roomId
      });
      var room = {...state.rooms[roomIndex], };
      if(!room.members){
        return state
      };
      var memberIndex = room.members.findIndex( function(member) {
        return member.id === action.payload.userId
      });
      if (memberIndex > -1) {
        room.members.splice(memberIndex, 1)
      };
      return assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
    }

    case 'SEND_MESSAGE': {
      var roomIndex = state.rooms.findIndex( function(room) {
        return room.id === action.payload.message.roomId
      });
      var room = {...state.rooms[roomIndex], };
      if(!room.messages){
        room.messages = []
      };
      room.messages.push(action.payload.message);
      return assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
    }

    case 'ROOMS_FETCHED': {
      if(!action.payload) {
        return state
      }
      const { roomsData } = action.payload.rooms;
      if (!roomsData) {
        return state;
      }
      const rooms = compose(
        map(item => item.room),
        values,
        map(compose(last, values)),
      )(roomsData);
      return assocPath(['rooms'], rooms, state);
    }

    default:
      return state;
  }
};

export default reducer;
