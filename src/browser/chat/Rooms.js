// @flow
import React from 'react';
import type { State, Room } from '../../common/types';
import { Box, Text, OutlineButton } from '../../common/components';
import { connect } from 'react-redux';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { injectIntl } from 'react-intl';
import RoomPage from './room/RoomPage';
import NewRoom from './NewRoom';


type RoomsItemProps = {
  room: Room,
};

const RoomsItem = ({room}: RoomsItemProps) => (
  <OutlineButton>{room.title}</OutlineButton>
);

type RoomsProps = {
  rooms: ?Array<Room>,
  intl: $IntlShape,
};

const Rooms = ({rooms, intl}: RoomsProps) => {
  if (rooms === null) {
    return (
      <Box>
        <NewRoom/>
        <Text marginBottom={0.6}>No room available.</Text>
      </Box>
    );
  }
  return (
    <Box>
      <NewRoom/>
      <Text>Rooms:</Text>
      <Box
        flexDirection="column"
        flexWrap="wrap"
        marginHorizontal={-0.25}
        marginBottom={0.6}
        width={2}>
          {rooms.map(room => (
            <RoomsItem
              key={room.id}
              room={room}
            />
          ))}
      </Box>
    </Box>
  )
};

export default compose (
  connect(
    (state: State) => ({
      rooms: state.chat.rooms,
    })
  ),
  injectIntl,
)(Rooms);
