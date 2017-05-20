// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Image, Text } from '../../common/components';
import { Title } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';

type ChatPageProps = {
  children: any,
  viewer: ?User,
};

const ChatPage = ({ children, viewer }: ChatPageProps) =>
  !viewer
    ? null
    : <Box>
        <Title message={linksMessages.chat} />
        {children ||
          <Box>
            <Text>todo</Text>
          </Box>}
      </Box>;

export default compose(
  connect((state: State) => ({
    viewer: state.users.viewer,
  })),
)(ChatPage);
