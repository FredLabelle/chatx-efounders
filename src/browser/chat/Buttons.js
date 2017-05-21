// @flow
import type { State, User, Room } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/chat/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { joinRoom, leaveRoom } from '../../common/chat/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';

type ButtonsProps = {
  joinRoom: typeof joinRoom,
  leaveRoom: typeof leaveRoom,
  roomId: string,
  viewer: User,
  isMember : boolean,
};

const Buttons = ({ joinRoom, leaveRoom, roomId, viewer, isMember }: ButtonsProps) => {
  return (
    <Box flexDirection="row" marginHorizontal={-0.25} marginVertical={1}>
      <FormattedMessage {...buttonsMessages.joinRoom}>
        {message => (
          <Button
            primary
            marginHorizontal={0.25}
            onPress={() => {
              isMember ? leaveRoom(roomId, viewer.id) : joinRoom(roomId, viewer)
            }}
          >
           {isMember ? "Leave" : "Join"}
          </Button>
        )}
      </FormattedMessage>
    </Box>
  );
};

export default compose(
  connect((state: State) => ({
    roomId: state.chat.currentRoom.id,
    viewer: state.users.viewer,
   }), {
    joinRoom,
    leaveRoom,
  }),
)(Buttons);
