// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/chat/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { joinRoom } from '../../common/chat/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';

type ButtonsProps = {
  joinRoom: typeof joinRoom,
  roomId: string,
  viewer: User,
  isMember: boolean,
};

const Buttons = ({ joinRoom, roomId, viewer, isMember }: ButtonsProps) => {

  return (
    <Box flexDirection="row" marginHorizontal={-0.25} marginVertical={1}>
      <FormattedMessage {...buttonsMessages.joinRoom}>
        {message => (
          <Button
            primary
            marginHorizontal={0.25}
            onPress={() => {
              joinRoom(roomId, viewer);
              console.log("trrrrr");
            } }
          >
           {message}
          </Button>
        )}
      </FormattedMessage>
    </Box>
  );
};

export default compose(
  connect((state: State) => ({
    isMember: state.chat.isMemberOfCurrentRoom,
    roomId: state.chat.currentRoom.id,
    viewer: state.users.viewer,
   }), {
    joinRoom,
  }),
)(Buttons);
