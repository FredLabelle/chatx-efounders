// @flow
import type { Action, Deps, Room } from '../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import { appError } from '../app/actions';

export const createRoom = (title: string) =>
  ({ getUid, now, firebase }: Deps): Action => {
    //TODO use epics
    var room = {
      createdAt: now(),
      id: getUid(),
      title: title.trim(),
    };
    let connectionRef = firebase.child(`rooms/${room.id}`).push( {room} );
    connectionRef.onDisconnect().remove();
    return {
      type: 'CREATE_ROOM',
      payload: {
        room: room,
      },
    }
};

export const selectRoom = (roomId: string) : Action => ({
  type: 'SELECT_ROOM',
  payload: { roomId },
});

export const joinRoom = (roomId: string, user: User) : Action => ({
  type: 'JOIN_ROOM',
  payload: {
    roomId: roomId,
    user: user,
  },
});

export const leaveRoom = (roomId: string, userId: string) : Action => ({
  type: 'LEAVE_ROOM',
  payload: {
    roomId: roomId,
    userId: userId,
  },
});

export const sendMessage = (title: string, user: User, roomId: string) =>
  ({ getUid, now }: Deps): Action => ({
  type: 'SEND_MESSAGE',
  payload: {
    message: {
      text: title.trim(),
      createdAt: now(),
      id: getUid(),
      roomId: roomId,
      authorId: user.id,
      authorName: user.displayName,
    },
   },
 });

 export const roomsFetched = (snap: Object): Action => {
   const rooms = snap.val();
   return {
     type: 'ROOMS_FETCHED',
     payload: { rooms },
   };
 };
