// @flow
import React from 'react';
import type { State, Room } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { Box, Text, Message } from '../../common/components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Title } from '../components';
import NewMessage from './NewMessage';
import Messages from './Messages';
import Buttons from './Buttons';
import Members from './Members';

type RoomSectionProps = {
  room : Room,
  intl : $IntlShape,
  sendMessage: typeof sendMessage,
};

const RoomSection = ({ room, intl, sendMessage } : RoomProps) => {
  if (!room) {
    return (
      <Box  borderColor="black">
        <Text>Please select or create a room.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box flexDirection="row" alignItems="center">
        <Text paddingRight={1}>#{room.title}</Text>
        <Buttons />
      </Box>
      <Box flexDirection="row" height={15}>
        <Box borderWidth={0.1} borderStyle='solid' borderColor="black" paddingLeft={0.2} width={20}  overflow='scroll'>
          <Messages messages={room.messages}/>
        </Box>
        <Box borderWidth={0.1} borderStyle='solid' borderColor="black" paddingLeft={0.2} width={8} overflow='scroll'>
          <Members members={room.members}/>
        </Box>
      </Box>
      <Box>
        <NewMessage room={room} />
      </Box>
    </Box>
  )
};

export default compose (
  connect(
    (state: State) => ({
      room: state.chat.currentRoom,
    })
  ),
  injectIntl,
)(RoomSection);
