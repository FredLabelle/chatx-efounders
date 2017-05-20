// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Image, Text, PageHeader } from '../../common/components';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import { Title } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import Rooms from './Rooms'

const ChatPage = () =>(
  <Box>
    <Title message={linksMessages.chat} />
    <PageHeader
      heading="Chat"
      description="Discuss with users."
      />
    <Rooms/>
  </Box>
);

export default ChatPage;
