import { Payload } from '../domain/dto';

export const getResponseMessage = (payload: Payload) => {
  const { type } = payload.message.contents[0];

  if (type === 'text') {
    return payload.message.contents[0].text;
  }

  if (type === 'button' || type === 'list') {
    return payload.message.contents[0].id;
  }

  return payload.message.contents[0].fileUrl;
};
