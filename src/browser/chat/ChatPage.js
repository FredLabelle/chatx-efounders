// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Image, PageHeader } from '../../common/components';
import { Title } from '../components';
import Rooms from './Rooms';
import RoomChat from './RoomChat';
import NewRoom from './NewRoom';

const ChatPage = () =>(
  <Box>
    <Title message={linksMessages.chat} />
    <PageHeader
      heading="Chat"
      description="Discuss with users."
      />
    <NewRoom/>
    <Box flexDirection="row">
      <Rooms/>
      <RoomChat/>
    </Box>
  </Box>
);

export default ChatPage;
