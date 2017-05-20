// @flow
import React from 'react';
import type { State, Room } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { Box, Text, Message } from '../../common/components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Title } from '../components';


type RoomSectionProps = {
  room : Room,
  intl : $IntlShape,
};

const RoomSection = ({ room, intl } : RoomProps) => {
  if (!room) {
    return (
      <Box  borderColor="black">
        <Text>Please select or create a room.</Text>
      </Box>
    );
  }

  return (
    <Box borderWidth={0.1} borderStyle='solid' borderColor="black" paddingLeft={0.2} width={20} height={20}>
      <Text>#{room.title}</Text>
      <Box flexDirection="row" alignItems="center">
       <Text>Fred:</Text>
       <Message color="black" >heyy!</Message>
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
