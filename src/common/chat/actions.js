// @flow
import type { Action, Deps, Room, Message } from '../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import { appError } from '../app/actions';

export const createRoom = (title: string) =>
({ getUid, now, firebase }: Deps): Action => {
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

export const joinRoom = (roomId: string, user: User) : Action => {
  return {
    type: 'JOIN_ROOM',
    payload: {
      roomId: roomId,
      user: user,
    },
  }
};

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

export const messageSent = (messageId: string): Action => {
    return  {
      type: 'MESSAGE_SENT',
      payload: {
        messageId: messageId,
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
  return {
    type: 'ROOMS_FETCHED',
    payload: { rooms },
  };
};

export const roomFetched = (snap: Object): Action => {
  const room = snap.val();
  return {
    type: 'ROOM_FETCHED',
    payload: { room },
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

const saveMessageEpic = (action$: any, { firebase }: Deps) =>
  action$.filter((action: Action) => action.type === 'SEND_MESSAGE')
  .mergeMap(action => {
    let ref = firebase.child(`rooms/${action.payload.message.roomId}/messages`)
    const promise = ref.push(action.payload.message);
    return Observable.from(promise)
    .map(() => promise.update({id: promise.key}))//add firebase generated ID inside the object
    .mapTo(messageSent(promise.key))
    .catch(error => Observable.of(appError(error)));
});

const selectRoomEpic = (action$: any, { firebase }: Deps) =>
  action$.filter((action: Action) => action.type === 'SELECT_ROOM')
  .mergeMap(action => {
    let ref = firebase.child(`rooms/${action.payload.roomId}`).on("value", roomFetched)
    return Observable.of();
});

const JoinRoomEpic = (action$: any, { firebase }: Deps) =>
  action$.filter((action: Action) => action.type === 'JOIN_ROOM')
  .mergeMap(action => {
    let ref = firebase.child(`rooms/${action.payload.roomId}`).on("value", roomFetched)
    return Observable.of();
});

export const epics = [createRoomEpic, saveMessageEpic, selectRoomEpic];
