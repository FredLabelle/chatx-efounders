// @flow
import React from 'react';
import type { State, Message } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { map, isEmpty, values } from 'ramda';
import { Box, Text } from '../../common/components';

type MessagesProps = {
  messages: ?Array<Message>
};

const Messages = ( {messages} : MessagesProps) => {
  if(!messages || isEmpty(messages)) {
    return (
      <Text/>
    );
  }

  return (
    <Box>
      {values(map(message => (
        <Box flexDirection="row" alignItems="center" key={message.createdAt} paddingTop={0.3} height={1} flexShrink={0}>
         <Text bold={true} >{message.authorName}: </Text>
         <Text color="black" marginLeft={0.2}>{message.text}</Text>
        </Box>
      ), messages))}
    </Box>
  );
}

export default Messages;
