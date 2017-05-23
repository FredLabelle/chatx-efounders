// @flow
import type { Room, ChatState } from '../../common/types';

const getCurrentRoom = (state: ChatState) : ?Room => {
  if(!state.chat.currentRoomId){
    return null
  }
  return  state.chat.rooms[state.chat.currentRoomId]
};

export default getCurrentRoom;
