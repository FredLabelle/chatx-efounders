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
  console.log("actions rooms");
  switch (action.type) {

    case 'CREATE_ROOM': {
      console.log("reduceer_create_Room");
      //var rooms = state.rooms ? state.rooms.slice() : []
      //rooms.push(action.payload.room)
      return state;
    }

    case 'SELECT_ROOM': {
      var roomId = action.payload.roomId
      return { ...state, currentRoomId: roomId };
    }

    case 'SEND_MESSAGE': {
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
      console.log("reduceer_Room_fetch");
      if(!action.payload) {
        return state
      }
      return {...state, rooms: action.payload.rooms};
    }

    default:
      return state;
  }
};

export default reducer;
