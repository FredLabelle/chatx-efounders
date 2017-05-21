// @flow
import type { Action, ChatState } from '../types';
import { assoc, assocPath, update } from 'ramda';

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

    case 'JOIN_ROOM': {
      var roomIndex = state.rooms.findIndex( function(room) {
        return room.id === action.payload.roomId
      });
      var room = {...state.rooms[roomIndex], };
      if(!room.members){
        room.members = []
      };
      room.members.push(action.payload.user); //TODO should not happen but check if already a member
      var newState = assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
      //Make sure currentRoom is still the one receiving new members
      return assocPath(['currentRoom'], room , newState);
    }

    case 'LEAVE_ROOM': {
      var roomIndex = state.rooms.findIndex( function(room) {
        return room.id === action.payload.roomId
      });
      var room = {...state.rooms[roomIndex], };
      if(!room.members){
        return state // Should not happen
      };
      var memberIndex = room.members.findIndex( function(member) {
        return member.id === action.payload.userId
      });
      if (memberIndex > -1) {
        room.members.splice(memberIndex, 1)
      };
      var newState = assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
      //Make sure currentRoom is still the one receiving new members
      return assocPath(['currentRoom'], room , newState);
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
      var newState = assocPath(['rooms'], update(roomIndex, room, state.rooms), state)
      //Make sure currentRoom is still the one receiving new message
      return assocPath(['currentRoom'], room , newState);
    }

    default:
      return state;
  }
};

export default reducer;
