import { Payload } from '../domain/dto';

export const getResponseMessage = (payload: Payload) => {
  const { type } = payload.message.contents[0];

  if (type === 'file') {
    return payload.message.contents[0].fileUrl;
  }

  if (type === 'text' && payload.message.contents[0].payload) {
    return payload.message.contents[0].payload;
  }

  return payload.message.contents[0].text;
};
