// @flow
import type { Room } from '../../common/types';

const getCurrentRoom = (rooms: Array<Room>, roomId: string) : ?Room => {
  var index = rooms.findIndex( function(room) {
    return room.id === roomId
  });
  return index > -1 ? rooms[index] : null

};

export default getCurrentRoom;
