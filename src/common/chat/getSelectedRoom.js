// @flow
import type { Room, ChatState } from '../../common/types';

const getSelectedRoom = (state: State) : ?Room => {
  if(!state.chat.selectedRoomId || !state.chat.rooms){
    return null
  }
  return  state.chat.rooms[state.chat.selectedRoomId]
};

export default getSelectedRoom;
