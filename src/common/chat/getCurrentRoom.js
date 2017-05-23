// @flow
import type { Room } from '../../common/types';

const getCurrentRoom = (rooms: Array<Room>, id: string) : ?Room => {
  var index = rooms.findIndex( function(room) {
    return room.id === id
  });
  return index > -1 ? rooms[index] : null

};

export default getCurrentRoom;
