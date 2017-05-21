// @flow
import React from 'react';
import type { State, Message } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { map } from 'ramda';
import { Box, Text } from '../../common/components';

type MessagesProps = {
  messages: ?Array<Message>
};

const Messages = ( {messages} : MessagesProps) => {
  if(!messages) {
    return (
      <Text/>
    );
  }

  return (
    <Box>
      {messages.map(message => (
        <Box flexDirection="row" alignItems="center" key={message.id} paddingTop={1}>
         <Text bold={true} >{message.authorId}: </Text>
         <Text color="black" marginLeft={0.2}>{message.text}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default Messages;
