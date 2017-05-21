// @flow
import React from 'react';
import { Form } from '../components';
import { Text, TextInput } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';
import chatMessages from '../../common/chat/chatMessages';
import { createRoom } from '../../common/chat/actions';

type NewRoomProps = {|
  createRoom: typeof createRoom,
  fields: any,
  intl: $IntlShape,
|};

const NewRoom = ({ createRoom, fields, intl }: NewRoomProps) => (
  <Form
    onSubmit={() => {
      const title = fields.title.value.trim();
      if (!title) return;
      createRoom(title);
      fields.$reset();
    }}
  >
    <Text>New room:</Text>
    <TextInput
      {...fields.title}
      maxLength={100}
      placeholder={intl.formatMessage(chatMessages.newRoomPlaceholder)}
      type="text"
    />
  </Form>
);

export default compose(
  connect(null, { createRoom }),
  fields({
    path: 'newRoom',
    fields: ['title'],
  }),
  injectIntl,
)(NewRoom);
