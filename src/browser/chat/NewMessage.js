// @flow
import React from 'react';
import type { State, Room, User } from '../../common/types';
import { Form } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Box, Text, Message, TextInput } from '../../common/components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { fields } from '../../common/lib/redux-fields';
import { sendMessage } from '../../common/chat/actions';
import chatMessages from '../../common/chat/chatMessages';

type NewMessageProps = {|
  sendMessage: typeof sendMessage,
  fields: any,
  intl: $IntlShape,
  roomId: string,
  viewer: ?User,
  isMember: boolean,
|};

const NewMessage = ({ sendMessage, fields, intl, roomId, viewer, isMember } : NewMessageProps ) => (
  <Form
    onSubmit={() => {
      const title = fields.title.value.trim();
      if (!title || !viewer) return;
      sendMessage(title, viewer, roomId);
      fields.$reset();
    }}
  >
    <TextInput
      {...fields.title}
      maxLength={100}
      disabled={!isMember}
      placeholder={
        isMember ?
        intl.formatMessage(chatMessages.newMessagePlaceholder) :
        intl.formatMessage(chatMessages.newMessageDisabledPlaceholder)}
      size={2}
      type="text"
    />
  </Form>
);

export default compose(
  connect((state: State) => ({
    viewer: state.users.viewer,
    roomId: state.chat.selectedRoomId,
  }),
  {sendMessage}),
  injectIntl,
  fields({ path: 'newMessage', fields: ['title'] }),
)(NewMessage);
