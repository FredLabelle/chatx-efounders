// @flow
import React from 'react';
import type { State, User } from '../../common/types';
import { injectIntl } from 'react-intl';
import { map } from 'ramda';
import { Box, Text } from '../../common/components';
import chatMessages from '../../common/chat/chatMessages';
import { compose } from 'ramda';

type MembersProps = {
  members: ?Array<User>,
    intl: $IntlShape,
};

const Members = ( {members, intl} : MembersProps) => {
  if(!members) {
    return (
      <Text/>
    );
  }

  return (
    <Box>
      <Text bold={true} >{intl.formatMessage(chatMessages.membersSectionTitle)}</Text>
      {members.map(member => (
        <Box flexDirection="row" alignItems="center" key={member.id} paddingTop={1} height={1} flexShrink={0}>
         <Text>{member.email}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default compose(
  injectIntl,
)(Members);
