// @flow
import React from 'react';
import type { State, Room, User } from '../../common/types';
import linksMessages from '../../common/app/linksMessages';
import { Form } from '../components';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
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
  room: Room,
  viewer: ?User,
|};

const NewMessage = ({ sendMessage, fields, intl, room, viewer } : NewMessageProps ) => (
  <Form
    onSubmit={() => {
      const title = fields.title.value.trim();
      if (!title || !viewer) return;
      sendMessage(title, viewer.id, room.id);
      fields.$reset();
    }}
  >
    <TextInput
      {...fields.title}
      maxLength={100}
      placeholder={intl.formatMessage(chatMessages.newMessagePlaceholder)}
      size={2}
      type="text"
    />
  </Form>
);

export default compose(
  connect((state: State) => ({
    viewer: state.users.viewer,
  }),
  {sendMessage}),
  injectIntl,
  fields({ path: 'newMessage', fields: ['title'] }),
)(NewMessage);
