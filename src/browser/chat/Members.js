// @flow
import React from 'react';
import type { State, User } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { map } from 'ramda';
import { Box, Text } from '../../common/components';

type MembersProps = {
  members: ?Array<User>
};

const Members = ( {members} : MembersProps) => {
  if(!members) {
    return (
      <Text/>
    );
  }

  return (
    <Box>
      <Text bold={true} >Members</Text>
      {members.map(member => (
        <Box flexDirection="row" alignItems="center" key={member.id} paddingTop={1} height={1} flexShrink={0}>
         <Text>{member.email}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default Members;
