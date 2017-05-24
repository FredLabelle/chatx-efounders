// @flow
import React from 'react';
import type { State, Room, User } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { Box, Text, Message } from '../../common/components';
import { injectIntl, FormattedMessage } from 'react-intl';
import chatMessages from '../../common/chat/chatMessages';
import getSelectedRoom from '../../common/chat/getSelectedRoom';
import { Title } from '../components';
import NewMessage from './NewMessage';
import Messages from './Messages';
import Buttons from './Buttons';
import Members from './Members';

type RoomChatProps = {
  room : Room,
  selectedRoomId: ?string,
  viewer : User,
  intl : $IntlShape,
};

const RoomChat = ({ room, selectedRoomId, viewer, intl } : RoomProps) => {

  const emptySection = (
    <Box  borderColor="black">
      <Text>{intl.formatMessage(chatMessages.noRoomSelectedPlaceholder)}</Text>
    </Box>
  );

  if (!room || !selectedRoomId) {
    return emptySection;
  }

  var isMember
  if(!room.members || isEmpty(room.members)){
    isMember = false
  } else {
      isMember = room.members[viewer.id] ? true : false
    };

  return (
    <Box>
      <Box flexDirection="row" alignItems="center">
        <Text paddingRight={1} >#{room.title}</Text>
        <Buttons isMember={isMember}/>
      </Box>
      <Box flexDirection="row" height={15}>
        <Box
          borderWidth={0.1}
          borderStyle='solid'
          borderColor="black"
          paddingLeft={0.2} width={20}
          overflow='scroll'>
          <Messages messages={room.messages}/>
        </Box>
        <Box
          borderWidth={0.1}
          borderStyle='solid'
          borderColor="black"
          paddingLeft={0.2}
          width={8}
          overflow='scroll'>
          <Members members={room.members}/>
        </Box>
      </Box>
      <Box>
        <NewMessage room={room} isMember={isMember}/>
      </Box>
    </Box>
  )
};

export default compose (
  connect(
    (state: State) => ({
      room: getSelectedRoom(state),
      selectedRoomId: state.chat.selectedRoomId,
      viewer: state.users.viewer,
    }),
  ),
  injectIntl,
)(RoomChat);
