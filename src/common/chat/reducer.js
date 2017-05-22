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

    case 'SEND_MESSAGE': {
      return Object.assign({}, state, {
        rooms: state.rooms.map((room, index) => {
          if (room.id === action.payload.message.roomId) {
            return Object.assign({}, room, {
              messages: [
                ...room.messages,
                action.payload.message
              ]
            })
          };
          return room
        })
      });
    }

    case 'JOIN_ROOM': {
      return Object.assign({}, state, {
        rooms: state.rooms.map((room, index) => {
          if (room.id === action.payload.roomId) {
            return Object.assign({}, room, {
              members: [
                ...room.members,
                action.payload.user
              ]
            })
          };
          return room
        })
      })
    }

    //TODO use object assign too here
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
