// @flow
import React from 'react';
import type { State, User } from '../../common/types';
import { injectIntl } from 'react-intl';
import { map, values, compose, isEmpty, last } from 'ramda';
import { Box, Text } from '../../common/components';
import chatMessages from '../../common/chat/chatMessages';

type MembersProps = {
  members: ?Object,
    intl: $IntlShape,
};

const Members = ( {members, intl} : MembersProps) => {
  if(!members || isEmpty(members)) {
    return (
      <Text/>
    );
  }
  //TODO store members as an array in the state ?
  let _members = compose(
    map(item => item.user),
    values,
    map(compose(last, values)),
  )(members)

  return (
    <Box>
      <Text bold={true} >{intl.formatMessage(chatMessages.membersSectionTitle)}</Text>
      {map(member => (
        <Box flexDirection="row" alignItems="center" key={member.id} paddingTop={1} height={1} flexShrink={0}>
         <Text>{member.email}</Text>
        </Box>
      ), _members)}
    </Box>
  );
}

export default compose(
  injectIntl,
)(Members);
