// @flow
import type { Action, Deps, Room } from '../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import { appError } from '../app/actions';

export const createRoom = (title: string) =>
({ getUid, now, firebase }: Deps): Action => {
  console.log("createRoom");

  return {
    type: 'CREATE_ROOM',
    payload: {
      createdAt: now(),
      title: title.trim(),
    }
  }
};

export const roomCreated = (): Action => ({
  type: 'ROOM_CREATED'
});


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
({ now }: Deps): Action => ({
  type: 'SEND_MESSAGE',
  payload: {
    message: {
      text: title.trim(),
      createdAt: now(),
      roomId: roomId,
      authorId: user.id,
      authorName: user.displayName,
    },
  },
});

export const messageSent = (messageId: string, roomId: string): Action => {
    return  {
      type: 'MESSAGE_SENT',
      payload: {
        messageId: messageId,
        roomId: roomId,
      }
    }
};


export const fetchRooms = (): Action => {
  //TODO implement loader on view
  return {
    type: 'FETCH_ROOMS',
  };
};

export const roomsFetched = (snap: Object): Action => {
  const rooms = snap.val();
  console.log(rooms);
  return {
    type: 'ROOMS_FETCHED',
    payload: { rooms },
  };
};

const createRoomEpic = (action$: any, { firebase }: Deps) =>
  action$.filter((action: Action) => action.type === 'CREATE_ROOM')
  .mergeMap(action => {
    const promise = firebase.child(`rooms/`).push(action.payload);
    return Observable.from(promise)
    .map(() => promise.update({id: promise.key}))//add firebase generated ID inside the object
    .map(roomCreated)
    .catch(error => Observable.of(appError(error)));
});

const newMessageEpic = (action$: any, { firebase }: Deps) =>
  action$.filter((action: Action) => action.type === 'SEND_MESSAGE')
  .mergeMap(action => {
    const promise = firebase.child(`messages/`).push(action.payload.message);
    return Observable.from(promise)
    .map(() => promise.update({id: promise.key}))//add firebase generated ID inside the object
    .mapTo(messageSent(promise.key, action.payload.message.roomId))
    .catch(error => Observable.of(appError(error)));
});

export const epics = [createRoomEpic, newMessageEpic];
