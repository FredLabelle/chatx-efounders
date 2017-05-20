// @flow
import React from 'react';
import type { State, Room } from '../../common/types';
import { Box, Text, OutlineButton } from '../../common/components';
import { connect } from 'react-redux';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { injectIntl } from 'react-intl';
import { selectRoom } from '../../common/chat/actions';


type RoomsItemProps = {
  room: Room,
  selectRoom: typeof selectRoom,
};

const RoomsItem = ({ room, selectRoom }: RoomsItemProps) => (
  <OutlineButton
    onClick={() => selectRoom(room)}
    >
    {room.title}
  </OutlineButton>
);

type RoomsProps = {
  rooms: ?Array<Room>,
  intl: $IntlShape,
  selectRoom: typeof selectRoom,
};

const Rooms = ({rooms, intl, selectRoom}: RoomsProps) => {
  if (!rooms) {
    return (
      <Box paddingRight={1} >
        <Text >No room available.</Text>
      </Box>
    );
  }
  return (
    <Box paddingRight={1} minWidth="180" backgroundColor="" alignItems='center'>
      <Text>Rooms</Text>
      <Box
        flexDirection="column"
        flexWrap="wrap">
          {rooms.map(room => (
            <RoomsItem
              key={room.id}
              room={room}
              selectRoom = {selectRoom}
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
    }),
    { selectRoom }
  ),
  injectIntl,
)(Rooms);
