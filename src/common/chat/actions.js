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
