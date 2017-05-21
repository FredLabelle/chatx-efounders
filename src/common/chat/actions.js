// @flow
import type { Action, Deps, Room } from '../types';
import { range } from 'ramda';

export const createRoom = (title: string) =>
  ({ getUid, now }: Deps): Action => ({
    type: 'CREATE_ROOM',
    payload: {
      room: {
        createdAt: now(),
        id: getUid(),
        title: title.trim(),
      },
    },
  });

export const selectRoom = (room: Room) : Action => ({
  type: 'SELECT_ROOM',
  payload: { room },
});

export const sendMessage = (title: string, userId: string, roomId: string) =>
  ({ getUid, now }: Deps): Action => ({
  type: 'SEND_MESSAGE',
  payload: {
    message: {
      text: title.trim(),
      createdAt: now(),
      id: getUid(),
      roomId: roomId,
      authorId: userId,
    },
   },
 });
