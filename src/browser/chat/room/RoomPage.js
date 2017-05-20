// @flow
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Box, Text } from '../../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../../components';

const RoomPage = () => (
  <Box>
    <Title message={linksMessages.todos} />
    <FormattedMessage {...linksMessages.todos}>
      {message => <Text>{message} </Text>}
    </FormattedMessage>
  </Box>
);

export default RoomPage;
